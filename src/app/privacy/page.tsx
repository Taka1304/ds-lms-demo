import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-extrabold mb-4">プライバシーポリシー（個人情報保護方針）</h1>
      {/* Scrollable container using TailwindCSS instead of ScrollArea component */}
      <div className="h-[calc(100vh-4rem)] overflow-y-auto">
        <Card className="space-y-4 p-6">
          {/* Section 1 */}
          <CardHeader>
            <CardTitle className="text-xl">１．プロジェクト情報</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              プロジェクト名：<strong>Data Dreamers</strong>
            </p>
            <p>
              代表者：<strong>吉本悠真</strong>
            </p>
          </CardContent>
          <Separator />

          {/* Section 2 */}
          <CardHeader>
            <CardTitle className="text-xl">２．個人情報の取得方法</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              当プロジェクトはユーザーが利用登録をするとき、氏名・メールアドレス・研修の進捗度・スコアなど
              個人を特定できる情報を取得します。
            </p>
          </CardContent>
          <Separator />

          {/* Section 3 */}
          <CardHeader>
            <CardTitle className="text-xl">３．個人情報の利用目的</CardTitle>
          </CardHeader>
          <CardContent>
            <p>研修の進捗度、コンペのスコアなどの情報を分析し、ユーザー別の能力やLMSの改善に使用します。</p>
          </CardContent>
          <Separator />

          {/* Section 4 */}
          <CardHeader>
            <CardTitle className="text-xl">４．個人データを安全に管理するための措置</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              当プロジェクトは個人情報を正確かつ最新の内容に保つよう努め、不正なアクセス・改ざん・漏えい・
              滅失及び毀損から保護するため全従業員及び役員に対して教育研修を実施しています。個人情報保護規程を
              設け、現場での管理についても定期的に点検を行っています。
            </p>
          </CardContent>
          <Separator />

          {/* Section 5 */}
          <CardHeader>
            <CardTitle className="text-xl">５．個人データの共同利用</CardTitle>
          </CardHeader>
          <CardContent>
            <p>当プロジェクトは、以下のとおり共同利用を行います。</p>
          </CardContent>
          <Separator />

          {/* Section 6 */}
          <CardHeader>
            <CardTitle className="text-xl">６．個人データの第三者提供について</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              当プロジェクトは法令及びガイドラインに別段の定めがある場合を除き、同意を得ないで第三者に個人情
              報を提供することは致しません。
            </p>
          </CardContent>
          <Separator />

          {/* Section 7 */}
          <CardHeader>
            <CardTitle className="text-xl">７．保有個人データの開示、訂正</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              本人からの開示請求には遅滞なく対応し、利用目的の通知や訂正、追加、削除、利用停止を希望される方はLMS開発班までご連絡ください。
            </p>
            <p>
              LMS班代表者名: <strong>勝木隆也</strong>
            </p>
          </CardContent>
          <Separator />

          {/* Section 8 */}
          <CardHeader>
            <CardTitle className="text-xl">８．個人情報取り扱いに関する相談や苦情の連絡先</CardTitle>
          </CardHeader>
          <CardContent>
            <p>個人情報の取り扱いに関するお問い合わせはお問い合わせフォームよりご連絡ください。</p>
          </CardContent>
          <Separator />

          {/* Section 9 */}
          <CardHeader>
            <CardTitle className="text-xl">９．SSL（Secure Socket Layer）について</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              WebサイトはSSLに対応し、通信を暗号化しています。氏名や住所、電話番号などの個人情報は自動的に暗号化されます。
            </p>
          </CardContent>
          <Separator />

          {/* Section 10 */}
          <CardHeader>
            <CardTitle className="text-xl">１０．cookieについて</CardTitle>
          </CardHeader>
          <CardContent>
            <p>cookieは個人特定情報を含まず、ブラウザ設定により無効化可能です。</p>
          </CardContent>
          <Separator />

          {/* Section 11 */}
          <CardHeader>
            <CardTitle className="text-xl">１１．プライバシーポリシーの制定日及び改定日</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              制定：<strong>2025年5月1日</strong>
            </p>
          </CardContent>
          <Separator />

          {/* Section 12 */}
          <CardHeader>
            <CardTitle className="text-xl">１２．免責事項</CardTitle>
          </CardHeader>
          <CardContent>
            <p>当サイト掲載情報の正確性には万全を期していますが、利用者の行為に対する責任は負いません。</p>
            <p>利用者が当サイトの利用により生じた損害や第三者への損害も一切責任を負いません。</p>
          </CardContent>
          <Separator />

          {/* Section 13 */}
          <CardHeader>
            <CardTitle className="text-xl">１３．著作権・肖像権</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Webサイト内の文章や画像などの無断使用や転用は禁止されています。</p>
          </CardContent>
          <Separator />

          {/* Section 14 */}
          <CardHeader>
            <CardTitle className="text-xl">１４．リンク</CardTitle>
          </CardHeader>
          <CardContent>
            <p>リンクはData Dreamersに所属する人のみに共有可能です。第三者への共有はご遠慮ください。</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
