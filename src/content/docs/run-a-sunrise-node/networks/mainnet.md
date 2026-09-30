---
title: Sunriseメインネット
description: Sunrise のメインネットワークです。実価値のあるトークンを使います。
---

:::danger
Cosmos Sunrise のメインネットは **2026年10月5日 12:00 UTC**、v2.0.0 アップグレード（ブロック高 **6,504,000**）で終了します。保有資産は Sunrise Edge に引き継がれます。終了前に資金を移動する必要はありません。

詳細: [Sunrise Edge](https://sunriselayer.io/)
:::

Sunrise のメインネットワークです。実価値のあるトークンを使います。

## メインネットの詳細

[sunrise-1 ネットワーク設定](https://github.com/sunriselayer/network/tree/main/sunrise-1)

[ジェネシスファイル](https://github.com/sunriselayer/network/blob/main/sunrise-1/genesis.json)

[スナップショット（Polkachu 提供）](https://www.polkachu.com/tendermint_snapshots/sunrise)

| 詳細 | 値 |
| ---- | -- |
| RPC | <https://a.consensus.sunrise-1.sunriselayer.io> |
| REST | <https://a.consensus.sunrise-1.sunriselayer.io:1318> |

## サードパーティのサービス

公式エンドポイントに加え、複数のサードパーティが Sunrise メインネット向けの公開エンドポイントやその他のサービスを提供しています。RPC、REST、gRPC、エクスプローラーのより包括的な一覧は [Chain Registry](https://github.com/cosmos/chain-registry/blob/master/sunrise/chain.json) を参照してください。

| プロバイダー | ノードサービス（スナップショット、ピアなど） |
| ------------ | -------------------------------------------- |
| Polkachu | <https://www.polkachu.com/networks/sunrise> |
| NodeStake | <https://nodestake.org/sunrise> |
| Krews | <https://sunrise-services.krews.xyz/sunrise> |
| MekongLabs | <https://mekonglabs.tech/services/mainnet/sunrise> |
| Synergy Nodes | <https://www.synergynodes.com/service/sunrise> |

## フロントエンド

| 名前 | URL |
| ---- | --- |
| APP（Tx ポータル） | <https://app.sunriselayer.io> |
| Risescan（エクスプローラー） | <https://risescan.sunriselayer.io/> |

## メインネットソフトウェア

提案とコミュニティを確認してください。セットアップは [sunrise-1](https://github.com/sunriselayer/network/tree/main/sunrise-1) を参照してください。
ジェネシスバイナリは `v1.0.0` です。

[リリース済みバイナリ](https://github.com/sunriselayer/sunrise/releases)

### ネットワークアップグレード

| 名前 | 高さ |
| ---- | ---- |
| [v1.1.0](https://github.com/sunriselayer/sunrise/releases/tag/v1.1.0) | 234700 |
| [v1.2.0](https://github.com/sunriselayer/sunrise/releases/tag/v1.2.0) | 765000 |

## IBC 設定

| 宛先チェーン | 宛先ポート | 宛先チャネル | 送信元チェーン | 送信元ポート | 送信元チャネル |
| ------------ | ---------- | ------------ | -------------- | ------------ | -------------- |
| `noble-1` | `transfer` | channel-168 | `sunrise-1` | `transfer` | channel-0 |
| `cosmoshub-4` | `transfer` | channel-1421 | `sunrise-1` | `transfer` | channel-1 |

## IBC デノム

| 名前 | チェーン | オリジナルデノム | IBC デノム | 小数点以下桁数 |
| ---- | -------- | ---------------- | --------- | -------------- |
| USDN | `noble-1` | `uusdn` | `ibc/A7AD825A4B48DDA0138D118655E60100D22A4D690C45B95221520B58C9A64B63` | 6 |
| USDC | `noble-1` | `uusdc` | `ibc/8E27BA2D5493AF5636760E354E46004562C46AB7EC0CC4C1CA14E9E20E2545B5` | 6 |
| USDY | `noble-1` | `ausdy` | `ibc/AAF322A78A0E34B76CDA05BA9AE96DC1521F9E103EC576AB9931116B2AB8C26B` | 18 |
| ATOM | `cosmoshub-4` | `uatom` | `ibc/C4CFF46FD6DE35CA4CF4CE031E643C8FDC9BA4B99AE598E9B0ED98FE3A2319F9` | 6 |
| USDT | `cosmoshub-4` | `ibc/E7E51FFF94A8B55BE84CEB0345E5CAF0A5DAEB374C6806CE908098B8996C7782` | `ibc/D4FF12988C31AD8E3D2555621F95C7EB2B6FBAAD2F9487FB11A2A8BBB004B4B3` | 6 |
| WBTC | `cosmoshub-4` | `ibc/D742E8566B0B8CC8F569D950051C09CF57988A88F0E45574BFB3079D41DE6462` | `ibc/0E293A7622DC9A6439DB60E6D234B5AF446962E27CA3AB44D0590603DFF6968E` | 8 |
| WETH | `cosmoshub-4` | `ibc/C0B53D3D23827AE38058BED0BDCD554229278AF530A8D265FCF6DFF7C4B2ADFF` | `ibc/694A6B26A43A2FBECCFFEAC022DEACB39578E54207FDD32005CD976B57B98004` | 18 |

## メインネットで USDN から USDrise をミントする

USDrise をミントするコントラクトのアドレスは `sunrise14hj2tavq8fpesdwxxcu44rty3hh90vhujrvcmstl4zr3txmfvw9s2v9j75` です。
USDN を使って同量の USDrise をミントできます。

```bash
sunrised tx wasm execute sunrise14hj2tavq8fpesdwxxcu44rty3hh90vhujrvcmstl4zr3txmfvw9s2v9j75 \
    '{"mint":{"amount":"1000000","recipient":"[your-address]"}}' \
--amount 1000000ibc/A7AD825A4B48DDA0138D118655E60100D22A4D690C45B95221520B58C9A64B63 \
--from=[your-account] --chain-id=sunrise-1\
--gas-prices=0.025uusdrise --gas-adjustment=1.5 --gas=auto -y
```

## メインネットで USDrise を USDN に償還する

USDrise を USDN に償還するコントラクトのアドレスは `sunrise14hj2tavq8fpesdwxxcu44rty3hh90vhujrvcmstl4zr3txmfvw9s2v9j75` です。
USDrise を使って同量の USDN を償還できます。

```bash
sunrised tx wasm execute sunrise14hj2tavq8fpesdwxxcu44rty3hh90vhujrvcmstl4zr3txmfvw9s2v9j75 \
'{"burn":{"amount":"1000000"}}' \
--amount 1000000uusdrise \
--from=[your-account] --chain-id=sunrise-1 \
--gas-prices=0.025uusdrise --gas-adjustment=1.5 --gas=auto -y
```
