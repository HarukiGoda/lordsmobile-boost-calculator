export default function PrivacyPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-16">
      <h1 className="mb-8 text-3xl font-bold">プライバシーポリシー</h1>
      <div className="prose prose-blue max-w-none text-muted-foreground">
        <h2 className="text-xl font-semibold text-foreground">
          当サイトについて
        </h2>
        <p>
          当サイト「Lordsmobile Boost
          Calculator」は、ロードモバイルのブースト値を計算するための無料ツールです。
        </p>

        <h2 className="mt-6 text-xl font-semibold text-foreground">
          広告の配信について
        </h2>
        <p>
          当サイトでは、第三者配信の広告サービス「Google
          AdSense」を利用しています。このような広告配信事業者は、ユーザーの興味に応じた商品やサービスの広告を表示するため、当サイトや他サイトへのアクセスに関する情報（氏名、住所、メール
          アドレス、電話番号は含まれません）を使用することがあります。
        </p>

        <h2 className="mt-6 text-xl font-semibold text-foreground">
          Cookie（クッキー）について
        </h2>
        <p>
          当サイトでは、Cookie
          を使用して、ユーザーのアクセス情報を収集しています。これにより、パーソナライズされた広告の表示や、サイトの利用状況の分析を行っています。ブラウザの設定で
          Cookie
          を無効にすることも可能ですが、その場合一部の機能が正しく動作しない可能性があります。
        </p>

        <h2 className="mt-6 text-xl font-semibold text-foreground">免責事項</h2>
        <p>
          当サイトの利用により生じた損害やトラブルについて、当方は一切の責任を負いかねます。自己責任の上でご利用ください。
        </p>
      </div>
    </div>
  )
}
