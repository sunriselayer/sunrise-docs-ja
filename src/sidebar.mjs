// Sidebar matching the published GitBook SUMMARY.md, with Japanese labels.
// Product names, module names, and network names stay in their original form.
export const sidebar = [
	{
		label: '学ぶ',
		items: [
			{
				label: 'Sunrise',
				items: [
					{ label: '概要', slug: 'learn/sunrise' },
					{ label: 'プルーフ・オブ・リクイディティ', slug: 'learn/sunrise/proof-of-liquidity' },
					{ label: 'データ可用性', slug: 'learn/sunrise/data-availability' },
					{ label: '流動性プール', slug: 'learn/sunrise/liquidity-pool' },
					{ label: 'スワップ', slug: 'learn/sunrise/swap' },
					{
						label: '流動性インセンティブ',
						items: [
							{ label: '概要', slug: 'learn/sunrise/liquidity-incentive' },
							{ label: 'ゲージ投票', slug: 'learn/sunrise/liquidity-incentive/gauges-voting' },
							{ label: 'ブライブ', slug: 'learn/sunrise/liquidity-incentive/bribes' },
						],
					},
					{ label: 'トークンコンバーター', slug: 'learn/sunrise/token-converter' },
					{ label: '手数料', slug: 'learn/sunrise/fee' },
					{ label: 'ロックアップアカウント', slug: 'learn/sunrise/lockup' },
					{ label: '非投票型デリゲーション', slug: 'learn/sunrise/shareclass' },
					{ label: 'Stable', slug: 'learn/sunrise/stable' },
				],
			},
			{
				label: 'RISE',
				items: [
					{ label: '概要', slug: 'learn/rise' },
					{ label: 'アロケーション', slug: 'learn/rise/allocation' },
				],
			},
			{ label: 'USDrise', slug: 'learn/usdrise' },
			{ label: 'Gluon', slug: 'learn/gluon' },
			{ label: 'GLU', slug: 'learn/glu' },
			{
				label: '構想',
				items: [
					{ label: '概要', slug: 'learn/thesis' },
					{ label: 'アプリチェーン構想', slug: 'learn/thesis/app-chain-thesis' },
					{ label: '相互運用性', slug: 'learn/thesis/interoperability' },
				],
			},
			{
				label: 'アプリ',
				items: [
					{ label: '概要', slug: 'learn/sunrise-app' },
					{ label: '流動性プール', slug: 'learn/sunrise-app/liquidity-pool' },
					{ label: 'スワップ', slug: 'learn/sunrise-app/swap' },
					{ label: 'ガバナンス', slug: 'learn/sunrise-app/gov' },
					{ label: 'ロックアップ', slug: 'learn/sunrise-app/lockup' },
					{ label: 'ポイントプログラム', slug: 'learn/sunrise-app/point-program' },
					{ label: '手数料', slug: 'learn/sunrise-app/fee' },
				],
			},
		],
	},
	{
		label: '構築',
		items: [
			{
				label: 'バリデーター',
				items: [
					{ label: '概要', slug: 'build/validators' },
					{ label: 'バリデーターになる方法', slug: 'build/validators/validator' },
					{ label: 'データ可用性の証明', slug: 'build/validators/data-availability-proof' },
					{ label: '自己委任', slug: 'build/validators/self-delegation' },
				],
			},
			{
				label: 'L2ブロックチェーン',
				items: [
					{ label: '概要', slug: 'build/l2-blockchains' },
					{
						label: 'Rollkit',
						items: [
							{ label: '概要', slug: 'build/l2-blockchains/rollkit' },
							{ label: 'Sunrise Data', slug: 'build/l2-blockchains/rollkit/sunrise-data' },
							{ label: 'Rollkit L2チェーン', slug: 'build/l2-blockchains/rollkit/rollkit' },
						],
					},
					{
						label: 'OP Stack',
						items: [
							{ label: '概要', slug: 'build/l2-blockchains/optimism' },
							{ label: 'Sunrise Data', slug: 'build/l2-blockchains/optimism/sunrise-data' },
							{ label: 'OP Stack L2チェーン', slug: 'build/l2-blockchains/optimism/op-stack' },
						],
					},
				],
			},
			{ label: 'クライアント', slug: 'build/client' },
		],
	},
	{
		label: 'ノードの運用',
		items: [
			{
				label: 'ネットワーク',
				items: [
					{ label: '概要', slug: 'run-a-sunrise-node/networks' },
					{ label: 'メインネット', slug: 'run-a-sunrise-node/networks/mainnet' },
					{ label: 'テストネット', slug: 'run-a-sunrise-node/networks/testnet' },
				],
			},
			{
				label: 'ノードの種類',
				items: [
					{ label: '概要', slug: 'run-a-sunrise-node/types' },
					{
						label: 'コンセンサス',
						items: [
							{ label: '概要', slug: 'run-a-sunrise-node/types/consensus' },
							{
								label: 'フルコンセンサスノード',
								slug: 'run-a-sunrise-node/types/consensus/full-consensus-node',
							},
							{
								label: 'バリデーターノード（ジェネシス）',
								slug: 'run-a-sunrise-node/types/consensus/genesis-validator',
							},
							{
								label: 'バリデーターノード',
								slug: 'run-a-sunrise-node/types/consensus/validator-node',
							},
							{
								label: 'Cosmovisorのセットアップ',
								slug: 'run-a-sunrise-node/types/consensus/setup-cosmovisor',
							},
						],
					},
					{ label: 'IBCリレーヤー', slug: 'run-a-sunrise-node/types/ibc-relayers' },
				],
			},
			{
				label: 'リソース',
				items: [
					{ label: '概要', slug: 'run-a-sunrise-node/resources' },
					{ label: 'アップグレード', slug: 'run-a-sunrise-node/resources/upgrade' },
					{ label: '環境', slug: 'run-a-sunrise-node/resources/environment' },
				],
			},
		],
	},
	{
		label: 'リンク',
		items: [
			{
				label: 'GitHub',
				link: 'https://github.com/sunriselayer',
				attrs: { target: '_blank', rel: 'noopener' },
			},
			{
				label: 'Discord',
				link: 'https://discord.com/invite/sunrise',
				attrs: { target: '_blank', rel: 'noopener' },
			},
			{
				label: 'X (Twitter)',
				link: 'https://twitter.com/SunriseLayer',
				attrs: { target: '_blank', rel: 'noopener' },
			},
			{
				label: 'Medium',
				link: 'https://sunriselayer.medium.com/',
				attrs: { target: '_blank', rel: 'noopener' },
			},
		],
	},
];
