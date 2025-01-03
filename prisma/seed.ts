import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const fingerNames = [1, 2, 3, 4, 5];

async function main() {
  // ブランド名を具体的に
  const brandNames = [
    'Elegant Touch',
    'Glamour Glaze',
    'Polish Paradise',
    'Artistic Shades',
    'Chic Nails',
    'Luxe Lacquer',
    'Pure Polish',
    'Radiant Nails',
    'Velvet Gloss',
    'Crystal Coat',
  ];
  const brands = await Promise.all(
    brandNames.map((name) =>
      prisma.brand.create({
        data: { name },
      })
    )
  );

  // ユーザーデータを作成
  const users = await Promise.all(
    Array.from({ length: 10 }, (_, i) =>
      prisma.user.create({
        data: {
          name: `User ${i + 1}`,
          email: `user${i + 1}@example.com`,
          image: 'https://placehold.jp/300x200.png',
        },
      })
    )
  );

  // ベースコートとトップコートに特徴を持たせる
  const baseCoatFeatures = ['長持ちさせる', '速乾性', '保湿効果', '滑らかな仕上がり', 'UVカット'];
  const baseCoats = await Promise.all(
    Array.from({ length: 10 }, (_, i) =>
      prisma.baseCoat.create({
        data: {
          name: `Base Coat - ${baseCoatFeatures[i % baseCoatFeatures.length]}`,
          brandId: brands[i % brands.length].id,
          image: 'https://placehold.jp/300x200.png',
        },
      })
    )
  );

  const topCoatFeatures = ['光沢仕上げ', 'マット仕上げ', 'UVカット', 'チップ防止', '速乾性'];
  const topCoats = await Promise.all(
    Array.from({ length: 10 }, (_, i) =>
      prisma.topCoat.create({
        data: {
          name: `Top Coat - ${topCoatFeatures[i % topCoatFeatures.length]}`,
          brandId: brands[i % brands.length].id,
          image: 'https://placehold.jp/300x200.png',
        },
      })
    )
  );

  // アートネイルとカラーネイルに具体的なジャンルを追加
  const artNailGenres = ['花柄', '幾何学模様', 'マーブルデザイン', '3Dデザイン', 'ホログラム'];
  const artNails = await Promise.all(
    Array.from({ length: 10 }, (_, i) =>
      prisma.artNail.create({
        data: {
          genre: artNailGenres[i % artNailGenres.length],
          name: `Art Nail - ${artNailGenres[i % artNailGenres.length]}`,
          brandId: brands[i % brands.length].id,
          image: 'https://placehold.jp/300x200.png',
        },
      })
    )
  );

  const colorNailGenres = ['ヌーディカラー', 'パステル', 'ビビッドカラー', 'グリッター', 'メタリック'];
  const colorNails = await Promise.all(
    Array.from({ length: 10 }, (_, i) =>
      prisma.colorNail.create({
        data: {
          genre: colorNailGenres[i % colorNailGenres.length],
          name: `Color Nail - ${colorNailGenres[i % colorNailGenres.length]}`,
          brandId: brands[i % brands.length].id,
          image: 'https://placehold.jp/300x200.png',
        },
      })
    )
  );

  // ネイルセットにテーマ性を追加
  const nailSetThemes = [
    'サマーバケーションセット',
    'スプリングブロッサムセット',
    'クラシックモノクローム',
    'ウィンタースノーフレーク',
    'パーティーナイトグラム',
    'エレガントローズ',
    'ミステリアスブラック',
    'デイジーフィールド',
    'ピンクオーシャン',
    'レインボーラッシュ',
  ];
  const nailSets = await Promise.all(
    nailSetThemes.map((theme, i) =>
      prisma.nailSet.create({
        data: {
          title: theme,
          image: 'https://placehold.jp/300x200.png',
          base: `Base for ${theme}`,
          userId: users[i % users.length].id,
        },
      })
    )
  );

  // 指ごとに異なるブランドとアイテムを割り当て
  await Promise.all(
    nailSets.map((nailSet) =>
      Promise.all(
        fingerNames.map((fingerName) => {
          const randomBaseCoat = baseCoats[Math.floor(Math.random() * baseCoats.length)];
          const randomTopCoat = topCoats[Math.floor(Math.random() * topCoats.length)];
          const randomArtNail = artNails[Math.floor(Math.random() * artNails.length)];
          const randomColorNail = colorNails[Math.floor(Math.random() * colorNails.length)];

          return prisma.nail.create({
            data: {
              finger: fingerName,
              baseId: randomBaseCoat.id,
              colorId: randomColorNail.id,
              artId: randomArtNail.id,
              topId: randomTopCoat.id,
              setId: nailSet.id,
            },
          });
        })
      )
    )
  );

  console.log('指ごとに異なるブランドを使ったシードデータの作成が完了しました！');
}

// Prismaクライアントのクリーンアップ処理
main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
