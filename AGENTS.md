# AGENTS.md

火事から守る：家の中の場面を見て、「住宅防火 いのちを守る10のポイント」（4つの習慣・6つの対策）のどれがいちばん合うかを当てる1日5問の学習ゲーム。正解したら「なんのため？」（出さない・気づく・広げない・消す・備える）も選ぶ。`index.html` と `data.js`（問題の種類）を GitHub Pages で公開する。

## 準備（最初に一度）

```bash
bash scripts/setup.sh   # Node.js（版は .nvmrc）を確かめ、検査の依存とブラウザを入れる。何度実行してもよい
```

Claude Code のクラウドセッションでは `.claude/settings.json` のフックが自動で実行する。

## push する前の確認

```bash
node qa/run.mjs   # 問題（26種類×3000問：選び肢・答えは1つ・答えと分け方と出典がポイントの表どおり）・今日の5問と上級（3年分）・とことん・通しで遊ぶ・続きから・2段目・復習・幅320px・PWA・引き継ぎ・見やすさ（CI の QA と同じ）
```

## このリポジトリの決まり

- 中身は、政府広報オンライン「住宅防火 いのちを守る10のポイント」（<https://www.gov-online.go.jp/article/201603/entry-7683.html>）と総務省消防庁の資料（`data.js` の `SRC`）で確かめたことだけ（2026-11-17 に読んだ）。種類を足すときも資料を読み、`src` を付け、`qa/run.mjs` の `TB`（別に書いたポイントの表）にも足す。
- 扱うのは家の火事を防ぐこと・早く気づくこと・広げないこと・小さいうちに消すこと・逃げる備えだけ。119番の救急（救急車よぶ？ kyukyusha-yobu）・地震や大雨（防災の判断 bousai-handan）と重ねない（QA が見る）。場面・家・人はすべて架空で、人の性別の役割を決めつけない。
- 公式の情報の代わりにしない：遊び方と「このゲームについて」と README に、消防の公式の情報の代わりではないこと、政府広報オンラインと消防庁で確かめることを置く（QA が見る）。
- 問題は、やさしいが選び肢3つ、ふつう・むずかしいが4つ（10のポイントから。まぎらわしいものは `near` で選び肢に入れない）。2回目のヒントはまちがいを消して2つにしぼり、ポイントの言葉（`key`）も見せる。2段目は「なんのため？」（5つ。10のポイントの「〜のために」の言葉どおり）で、種類（`grp`）で決まる。
- 今日の5問（やさしい2・ふつう2・むずかしい1、種類は重ねない）・上級（むずかしい3、今日のむずかしいと別）は日本時間の日付の種で決まり、だれでも同じ。`Math.random()` は練習・とことんの種だけ。乱数は `sort` の比較の中で引かない。`KINDS`・言い回しの並びは最後に足すだけ（QA の `PIN` が第1回の1問目を見る）。`data.js` を変える PR は自動ではマージされない（`hold_paths`）。
- ★はまちがい＋ヒントの数（0で★3・1で★2・2以上で★1）。上級はヒントなし。時間制限なし。
- 好きなだけ遊べる：チケット・ライフ・回数制限・🔒で開くモードを入れない（shared-workflows `routines/game-dev.md` F1〜F7。QA が見る）。とことん（`runs.e`）はまちがえても続き、「ここで降りる」で終わる。
- 1問を深くする：`depth.js` と `qa/depth-check.mjs` は shared-workflows `template/` の写しで、ここでは直さない。自信あり・2段目「なんのため？」・復習（1→3→7日後）。記録 `kjm-v1`・文字 `kjm-fs`・復習 `kjm-depth`。
- 共有は遊ぶ人が押したときに開くリンクだけ。シェアの文に問題・答えを出さない。感想は Issue フォーム（`.github/ISSUE_TEMPLATE/feedback.yml`）を開くだけ。応援は Ko-fi へのただのリンクだけ。
- 外へ通信しない（CSP の `connect-src 'self'` を広げない）。見やすさ（`<!-- a11y:begin -->`〜`end`・`qa/a11y.mjs`）と引き継ぎ（`transfer.js`・`qa/transfer-check.mjs`）は shared-workflows `template/` の写しで、ここでは直さない。
- 画面の土台は憲法のしくみ（kenpo-shikumi）から写した。写し元の言葉が残っていないかを QA が見る。
- PWA：画面のファイルを足したら `sw.js` の `SHELL` にも足し、中身を大きく変えたら `CACHE` の版を上げる。アイコンは `node tools/make-icons.cjs`、`og.png` は `node tools/make-og.cjs`。
- 公開リポジトリなので、個人情報・鍵を入れない。

## 公開

- GitHub Pages は `main` のルート（`/`）を公開する。PR の QA と Secret scan が ✅ になると `automerge.yml` が自動でマージする。止めたいときは下書きにするか、ラベル「自動マージしない」を付ける。
- `sw.js`・`manifest.webmanifest`・`data.js` を変える PR は自動ではマージされない（`hold_paths`）。CodeRabbit のレビューを読み、手でマージする直前に今の head へのレビューを読み直す。CodeRabbit は PR に `@coderabbitai review` とコメントして頼む。

## 共通のきまり

- PR の作り方・マージの仕方は satou-aaaaa/shared-workflows の `routines/pr.md`、全体のきまりは `routines/common.md` に従う。
- CI の部品は shared-workflows の共通部品を呼ぶ。リポジトリ側の .github/workflows には呼び出しと設定値だけを書く。
- Claude 以外の AI・人が作業するときは、shared-workflows の `routines/tool-map.md` と `routines/without-claude.md` を読む。
