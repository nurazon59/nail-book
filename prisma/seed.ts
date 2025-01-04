import { PrismaClient } from '@prisma/client';
import { fingerToNumber } from '@/lib/finger';

const prisma = new PrismaClient();
const fingerNames = ['親指', '人差し指', '中指', '薬指', '小指'];

async function main() {
  const brandNames = [
    'PreGel',
    'T-Gel',
    'Kokoist',
    'emena',
    'toys',
  ];
  const brands = await Promise.all(
    brandNames.map((name) =>
      prisma.brand.create({
        data: { name },
      })
    )
  );

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

  const baseCoatFeatures = ['ピールオフ', 'ノーサンディングベース', 'ベースコート'];
  const baseCoats = await Promise.all(
    Array.from({ length: 10 }, (_, i) =>
      prisma.baseCoat.create({
        data: {
          name: `${baseCoatFeatures[i % baseCoatFeatures.length]}`,
          brandId: brands[i % brands.length].id,
          image: 'https://placehold.jp/300x200.png',
        },
      })
    )
  );

  const topCoatFeatures = ['マット', 'ノンワイプトップ', 'トップコート'];
  const topCoats = await Promise.all(
    Array.from({ length: 10 }, (_, i) =>
      prisma.topCoat.create({
        data: {
          name: ` ${topCoatFeatures[i % topCoatFeatures.length]}`,
          brandId: brands[i % brands.length].id,
          image: 'https://placehold.jp/300x200.png',
        },
      })
    )
  );

  const artNailGenres = ['パウダー', 'パーツ類', 'インク', '3D'];
  const artNails = await Promise.all(
    Array.from({ length: 10 }, (_, i) =>
      prisma.artNail.create({
        data: {
          genre: artNailGenres[i % artNailGenres.length],
          name: `${artNailGenres[i % artNailGenres.length]}`,
          brandId: brands[i % brands.length].id,
          image: 'https://placehold.jp/300x200.png',
        },
      })
    )
  );

  const colorNailGenres = ['赤', '青', '緑'];
  const colorNails = await Promise.all(
    Array.from({ length: 10 }, (_, i) =>
      prisma.colorNail.create({
        data: {
          genre: colorNailGenres[i % colorNailGenres.length],
          name: `${colorNailGenres[i % colorNailGenres.length]}`,
          brandId: brands[i % brands.length].id,
          image: 'https://placehold.jp/300x200.png',
        },
      })
    )
  );

  const nailSetThemes = [
    '自爪',
    'アクリル',
    'チップ',
    'ジェル',
    'スカルプ',
    'フレンチ',
    'グラデーション',
    'マーブル',
    'ホログラム',
    'ラメ',
    'シェル',
    'ストーン',
    'スタッズ',
    'シール',
    'エアブラシ',
    'ミラーネイル',
    'マットネイル',
    'クリアネイル',
    'ワンカラー',
    'ニュアンスネイル',
    'ピーコック',
    'タイダイ',
    'ドット',
    'チェック',
    'ボーダー',
    'アニマル柄',
    'フラワー',
    'レース',
    '和柄',
    'キャラクター',
  ];
  const nailSets = await Promise.all(
    nailSetThemes.map((theme, i) =>
      prisma.nailSet.create({
        data: {
          title: theme,
          image: 'https://placehold.jp/300x200.png',
          base: `${theme}`,
          isPublic: i % 2 === 0,
          userId: users[i % users.length].id,
        },
      })
    )
  );

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
              finger: fingerToNumber(fingerName),
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

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
