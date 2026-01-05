
import requests
from bs4 import BeautifulSoup
import json
import csv
import sys
import time
import os
from urllib.parse import urljoin

# Standard User-Agent to mimic a real browser
HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

def clean_price(price_str):
    """
    Cleans the price string to return a number.
    Removes currency symbols and extra whitespace.
    """
    if not price_str:
        return 0
    # Remove 'MAD', 'DHS', whitespace, commas
    clean = price_str.upper().replace('MAD', '').replace('DHS', '').replace(',', '').replace(' ', '')
    try:
        return float(clean)
    except ValueError:
        return 0

def scrape_store(url, output_file='extracted_products.json'):
    print(f"🚀 Starting scrape for: {url}")
    
    try:
        response = requests.get(url, headers=HEADERS, timeout=15)
        response.raise_for_status()
    except requests.exceptions.RequestException as e:
        print(f"❌ Error fetching URL: {e}")
        return

    soup = BeautifulSoup(response.text, 'html.parser')
    
    products = []
    
    # Selectors for YouCan / General styling found on storeelhawta
    # We look for common container classes
    product_cards = soup.select('.product-item')
    
    if not product_cards:
        # Fallback: Try other common selectors if .product-item isn't found
        product_cards = soup.select('.product-card, .grid__item, .card')
    
    print(f"📦 Found {len(product_cards)} product cards.")

    for card in product_cards:
        try:
            # 1. Title
            title_tag = card.select_one('.product-title, h3, h2.title, .card__heading')
            title = title_tag.get_text(strip=True) if title_tag else "Unknown Product"
            
            # 2. Price
            # Try to find the 'current' price (often has class .after or .price-item--regular)
            price_tag = card.select_one('.product-price .after, .price .after, .price, .money')
            raw_price = price_tag.get_text(strip=True) if price_tag else "0"
            price = clean_price(raw_price)
            
            # 3. Image
            img_tag = card.select_one('.product-thumbnail img, .product-card__image img, img')
            image_url = ""
            if img_tag:
                if 'data-src' in img_tag.attrs:
                    image_url = img_tag['data-src']
                elif 'src' in img_tag.attrs:
                    image_url = img_tag['src']
                
                # Fix relative URLs
                if image_url and image_url.startswith('//'):
                    image_url = 'https:' + image_url
                elif image_url and image_url.startswith('/'):
                    image_url = urljoin(url, image_url)

            # 4. Link
            link_tag = card.select_one('a.product-thumbnail, a.product-link, a')
            product_link = ""
            if link_tag and 'href' in link_tag.attrs:
                product_link = urljoin(url, link_tag['href'])

            products.append({
                "name": title,
                "price": price,
                "image_url": image_url,
                "product_url": product_link,
                "category": "Uncategorized" # Default
            })
            
        except Exception as e:
            print(f"⚠️ Error parsing a card: {e}")
            continue

    # Summary
    print(f"✅ Extracted {len(products)} products.")
    
    # Save to JSON
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(products, f, indent=4, ensure_ascii=False)
        
    print(f"💾 Saved data to {output_file}")
    return products

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python3 scraper.py <URL>")
        # Default for testing if run without args
        target_url = "https://storeelhawta.com/collections/swisswatches"
        print(f"Using default URL: {target_url}")
    else:
        target_url = sys.argv[1]

    scrape_store(target_url)
