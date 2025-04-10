"use client";

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export default function ContactPage() {
  const { toast } = useToast();

  const handleClick = () => {
    toast({
      title: "送信完了",
      description: "お問い合わせありがとうございます。送信が完了しました。",
    });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      mode: "no-cors",
    }).then(() => {
      form.reset();
    });
  };

  return (
    <div className="items-center justify-center">
      <div className="border-b border-gray-300 mt-5">
        <h1 className="text-2xl font-bold text-center mb-4">
          お問い合わせ
          <span className="text-sm text-gray-400 p-5">お問い合わせ内容を下記フォームにご入力ください。</span>
        </h1>
      </div>

      {/* フォーム部分 */}
      <div className="items-center justify-center mt-6  max-w-2xl mx-auto px-4">
        <h2 className="text-lg font-semibold mb-6">お問い合わせ詳細</h2>
        <form
          onSubmit={handleSubmit}
          action="https://docs.google.com/forms/u/0/d/e/1FAIpQLSdp5gWDHOF-fLmxBoTNCndA_ikuLTlT_J770h-Vg6JpXTwI8A/formResponse"
          method="POST"
          target="_blank"
          className="space-y-4"
        >
          {/* お問い合わせ内容 */}
          <div>
            <label htmlFor="field-category" className="block text-gray-700 font-semibold">
              お問い合わせ内容 <span className="text-red-500 font-medium">*必須</span>
            </label>

            <Select name="entry.1363100018" required>
              <SelectTrigger className="w-full border border-gray-300 p-2 rounded-md">
                <SelectValue placeholder="選択してください" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="問題の内容に関するお問い合わせ">問題の内容に関するお問い合わせ</SelectItem>
                <SelectItem value="バグ・不具合に関するお問い合わせ">バグ・不具合に関するお問い合わせ</SelectItem>
                <SelectItem value="会員登録・ログインに関するお問い合わせ">
                  会員登録・ログインに関するお問い合わせ
                </SelectItem>
                <SelectItem value="要望・改善案に関するお問い合わせ">要望・改善案に関するお問い合わせ</SelectItem>
                <SelectItem value="その他のお問い合わせ">その他のお問い合わせ</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 件名 */}
          <div>
            <label htmlFor="field-subject" className="block text-gray-700 font-semibold">
              件名 <span className="text-red-500 font-medium">*必須</span>
            </label>
            <input
              type="text"
              name="entry.2022649777"
              className="w-full border border-gray-300 p-2 rounded-md"
              id="field-subject"
              placeholder="件名"
              required
            />
          </div>

          {/* 内容 */}
          <div>
            <label htmlFor="field-message" className="block text-gray-700 font-semibold">
              内容 <span className="text-red-500 font-medium">*必須</span>
            </label>

            <p className="text-sm text-gray-500 mb-1">
              このお問い合わせフォームでは演習内容に関するご質問にはお答えできません。
              <br />
              当フォームでは対応いたしかねますのでご了承ください。
            </p>

            <Textarea
              name="entry.211667335"
              className="w-full border border-gray-300 p-2 rounded-md h-40"
              id="field-message"
              placeholder="お問い合わせ内容"
              required
            />
          </div>

          {/* メールアドレス */}
          <div>
            <label htmlFor="field-email" className="block text-gray-700 font-semibold">
              メールアドレス <span className="text-red-500 font-medium">*必須</span>
            </label>
            <input
              type="email"
              name="entry.1941473844"
              className="w-full border border-gray-300 p-2 rounded-md"
              id="field-email"
              placeholder="db-lsm@example.com"
              required
            />
          </div>
          {/* 送信ボタン */}
          <div className="mt-5">
            <Button
              onClick={handleClick}
              type="submit"
              className="bg-green-500 text-white py-2 rounded-md hover:bg-green-600 p-4"
            >
              送信
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
