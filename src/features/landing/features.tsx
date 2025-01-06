"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { BarChart2, Brain, Code, Compass, MessageCircle, Trophy } from "lucide-react";

const features = [
  {
    icon: Code,
    title: "基礎力育成",
    description: "Pythonを使ったアルゴリズムやデータ分析に必要なデータ整形などの演習問題で基礎力を育成します。",
  },
  {
    icon: Brain,
    title: "AIフィードバック (beta)",
    description: "AIがあなたのコードを分析し、改善点や最適化の提案を行います。",
  },
  {
    icon: Trophy,
    title: "ライバルとの競争",
    description: "問題の解答速度や解答の質でランキング形式でライバルと競い合い、モチベーションを維持します。",
  },
  {
    icon: MessageCircle,
    title: "質問チャット (beta)",
    description: "先輩プログラマーに気軽に質問できるチャット機能で、疑問をすぐに解決できます。",
  },
  {
    icon: BarChart2,
    title: "スキルマップ可視化 (beta)",
    description: "自身のデータサイエンス力をスキルマップとして可視化し、成長を実感できます。",
  },
  {
    icon: Compass,
    title: "学習レコメンド (alpha)",
    description: "あなたのスキルレベルに基づいて、今後学ぶべき領域をAIがレコメンドします。",
  },
];

export default function Features() {
  return (
    <section id="features" className="w-full flex flex-col items-center py-12 md:py-24 lg:py-32 bg-gray-100">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardHeader>
                  <feature.icon className="w-10 h-10 mb-2 text-purple-600" />
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
