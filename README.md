# ChorBoard

ブラウザ上で動くコードパッド楽器。PCキーボードやMIDIパッドでコード（和音）をリアルタイムに演奏できる。

## 特徴

- **14キーのコードパッド** — キーボードの `Q W E R T Y U`（上段）と `A S D F G H J`（下段）にコードをアサイン
- **42種のコードタイプ** — トライアド、セブンス、ナインス、イレブンス、サーティーンス、add系、オルタード系
- **ボイシングシステム** — Close / Drop2 / Drop3 をルールベースで自動生成、カスタムボイシングも可能
- **スラッシュコード** — ベース音を独立して指定（C/Bb など）
- **ブラウザ内蔵シンセ** — Tone.js による PolySynth で即座に発音
- **Web MIDI API** — 外部MIDIデバイスからの入力、DAWや外部音源へのMIDI出力に対応
- **ピアノキーボード表示** — 現在鳴っている音をリアルタイムに可視化

## 技術スタック

- Vue 3 (`<script setup>` + Composition API)
- Pinia (状態管理)
- Vite 8
- Tailwind CSS v4
- TypeScript 5
- Tone.js (Web Audio)
- Web MIDI API

## 開発

```bash
npm install
npm run dev      # 開発サーバー起動
npm run build    # プロダクションビルド
npm run preview  # ビルド結果のプレビュー
```

## 注意事項

- Web MIDI API の利用には HTTPS 環境が必要（localhost は例外）
- MIDI 機能は Chromium 系ブラウザでのみ動作（Firefox は Web MIDI API 非対応）
