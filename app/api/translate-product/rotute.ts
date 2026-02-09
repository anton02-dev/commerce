import * as deepl from 'deepl-node';
import fs from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

const translator = new deepl.Translator(process.env.DEEPL_API_KEY!);

interface ProductTranslation {
  title: string;
  description: string;
  descriptionHtml: string;
  [key: string]: any;
}

export async function POST(req: NextRequest) {
  try {
    const { productId, product, targetLang } = await req.json();

    if (!productId || !product || !targetLang) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if translation already exists
    const filePath = path.join(
      process.cwd(),
      'translations/products',
      `${productId}-${targetLang}.json`
    );

    try {
      const cached = await fs.readFile(filePath, 'utf-8');
      return NextResponse.json(JSON.parse(cached));
    } catch {
      // Translation doesn't exist, create it
    }

    // Translate product fields
    const fieldsToTranslate = [
    { key: 'title', text: product.title },
    { key: 'description', text: product.description },
    { key: 'descriptionHtml', text: product.descriptionHtml },
    { key: 'seoTitle', text: product.seo?.title },        // Add this
    { key: 'seoDescription', text: product.seo?.description }, // Add this
    ];

    const translations = await Promise.all(
      fieldsToTranslate.map(async ({ key, text }) => {
        if (!text) return { key, translation: '' };
        
        const result = await translator.translateText(
          text,
          null,
          targetLang as deepl.TargetLanguageCode,
          { tagHandling: 'html' }
        );
        
        return { key, translation: result.text };
      })
    );

    // Build translated product
    const translatedProduct: ProductTranslation = { ...product };
    translations.forEach(({ key, translation }) => {
      translatedProduct[key] = translation;
    });

    // Save translation
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, JSON.stringify(translatedProduct, null, 2));

    return NextResponse.json(translatedProduct);
  } catch (error) {
    console.error('Translation error:', error);
    return NextResponse.json(
      { error: 'Translation failed' },
      { status: 500 }
    );
  }
}