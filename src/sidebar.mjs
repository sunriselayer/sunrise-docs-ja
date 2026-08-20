// Sidebar matching the published GitBook SUMMARY.md.
export const sidebar = [
	{
		label: 'Learn',
		items: [
			{
				label: 'Sunrise',
				items: [
					{ label: 'Overview', slug: 'learn/sunrise' },
					{ label: 'Proof of Liquidity', slug: 'learn/sunrise/proof-of-liquidity' },
					{ label: 'Data Availability', slug: 'learn/sunrise/data-availability' },
					{ label: 'Liquidity Pool', slug: 'learn/sunrise/liquidity-pool' },
					{ label: 'Swap', slug: 'learn/sunrise/swap' },
					{
						label: 'Liquidity Incentive',
						items: [
							{ label: 'Overview', slug: 'learn/sunrise/liquidity-incentive' },
							{ label: 'Gauges Voting', slug: 'learn/sunrise/liquidity-incentive/gauges-voting' },
							{ label: 'Bribes', slug: 'learn/sunrise/liquidity-incentive/bribes' },
						],
					},
					{ label: 'TokenConverter', slug: 'learn/sunrise/token-converter' },
					{ label: 'Fee', slug: 'learn/sunrise/fee' },
					{ label: 'Lockup Account', slug: 'learn/sunrise/lockup' },
					{ label: 'Non-Voting Delegation', slug: 'learn/sunrise/shareclass' },
					{ label: 'Stable', slug: 'learn/sunrise/stable' },
				],
			},
			{
				label: 'RISE',
				items: [
					{ label: 'Overview', slug: 'learn/rise' },
					{ label: 'Allocations', slug: 'learn/rise/allocation' },
				],
			},
			{ label: 'USDrise', slug: 'learn/usdrise' },
			{ label: 'Gluon', slug: 'learn/gluon' },
			{ label: 'GLU', slug: 'learn/glu' },
			{
				label: 'Thesis',
				items: [
					{ label: 'Overview', slug: 'learn/thesis' },
					{ label: 'App chain thesis', slug: 'learn/thesis/app-chain-thesis' },
					{ label: 'Interoperability', slug: 'learn/thesis/interoperability' },
				],
			},
			{
				label: 'App',
				items: [
					{ label: 'Overview', slug: 'learn/sunrise-app' },
					{ label: 'Liquidity Pool', slug: 'learn/sunrise-app/liquidity-pool' },
					{ label: 'Swap', slug: 'learn/sunrise-app/swap' },
					{ label: 'Governance', slug: 'learn/sunrise-app/gov' },
					{ label: 'Lockup', slug: 'learn/sunrise-app/lockup' },
					{ label: 'Point Program', slug: 'learn/sunrise-app/point-program' },
					{ label: 'Fee', slug: 'learn/sunrise-app/fee' },
				],
			},
		],
	},
	{
		label: 'Build',
		items: [
			{
				label: 'Validators',
				items: [
					{ label: 'Overview', slug: 'build/validators' },
					{ label: 'How to Become a Validator', slug: 'build/validators/validator' },
					{ label: 'Proof of Data Availability', slug: 'build/validators/data-availability-proof' },
					{ label: 'Self Delegation', slug: 'build/validators/self-delegation' },
				],
			},
			{
				label: 'L2 Blockchains',
				items: [
					{ label: 'Overview', slug: 'build/l2-blockchains' },
					{
						label: 'Rollkit',
						items: [
							{ label: 'Overview', slug: 'build/l2-blockchains/rollkit' },
							{ label: 'Sunrise Data', slug: 'build/l2-blockchains/rollkit/sunrise-data' },
							{ label: 'Rollkit L2 Chain', slug: 'build/l2-blockchains/rollkit/rollkit' },
						],
					},
					{
						label: 'OP Stack',
						items: [
							{ label: 'Overview', slug: 'build/l2-blockchains/optimism' },
							{ label: 'Sunrise Data', slug: 'build/l2-blockchains/optimism/sunrise-data' },
							{ label: 'OP Stack L2 Chain', slug: 'build/l2-blockchains/optimism/op-stack' },
						],
					},
				],
			},
			{ label: 'Client', slug: 'build/client' },
		],
	},
	{
		label: 'Run a Sunrise Node',
		items: [
			{
				label: 'Networks',
				items: [
					{ label: 'Overview', slug: 'run-a-sunrise-node/networks' },
					{ label: 'Mainnet', slug: 'run-a-sunrise-node/networks/mainnet' },
					{ label: 'Testnet', slug: 'run-a-sunrise-node/networks/testnet' },
				],
			},
			{
				label: 'Types of Nodes',
				items: [
					{ label: 'Overview', slug: 'run-a-sunrise-node/types' },
					{
						label: 'Consensus',
						items: [
							{ label: 'Overview', slug: 'run-a-sunrise-node/types/consensus' },
							{
								label: 'Full Consensus Node',
								slug: 'run-a-sunrise-node/types/consensus/full-consensus-node',
							},
							{
								label: 'Validator Node (Genesis)',
								slug: 'run-a-sunrise-node/types/consensus/genesis-validator',
							},
							{
								label: 'Validator Node',
								slug: 'run-a-sunrise-node/types/consensus/validator-node',
							},
							{
								label: 'Setup Cosmovisor',
								slug: 'run-a-sunrise-node/types/consensus/setup-cosmovisor',
							},
						],
					},
					{ label: 'IBC Relayers', slug: 'run-a-sunrise-node/types/ibc-relayers' },
				],
			},
			{
				label: 'Resources',
				items: [
					{ label: 'Overview', slug: 'run-a-sunrise-node/resources' },
					{ label: 'Upgrade', slug: 'run-a-sunrise-node/resources/upgrade' },
					{ label: 'Environment', slug: 'run-a-sunrise-node/resources/environment' },
				],
			},
		],
	},
	{
		label: 'Links',
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
