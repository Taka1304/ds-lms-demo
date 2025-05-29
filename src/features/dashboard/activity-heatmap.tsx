"use client";

import dayjs from "dayjs";
import "dayjs/locale/ja";

dayjs.locale("ja");

type ActivityHeatmapProps = {
  activityData?: Record<string, number>;
};

const COLORS = ["bg-gray-500/10", "bg-primary/40", "bg-primary/60", "bg-primary/80", "bg-primary"];
const PAST_DAYS_COUNT = 200;

// 過去200日分の日付を生成し、アクティビティデータとマッチング
const generateActivityData = (activityData: Record<string, number> = {}) => {
  const days = [];
  for (let i = PAST_DAYS_COUNT - 1; i >= 0; i--) {
    const date = dayjs().subtract(i, "day");
    const dateString = date.format("YYYY-MM-DD");

    days.push({
      date: dateString,
      count: activityData[dateString] || 0,
      dayjs: date,
    });
  }
  return days;
};

// 色の強度を決定する関数
const getColorIntensity = (count: number) => {
  if (count === 0) return COLORS[0];
  if (count < 3) return COLORS[1];
  if (count < 5) return COLORS[2];
  if (count < 8) return COLORS[3];
  return COLORS[4];
};

export function ActivityHeatmap({ activityData = {} }: ActivityHeatmapProps) {
  const days = generateActivityData(activityData);

  // 週ごとにデータをグループ化
  const weeks: Array<Array<{ date: string; count: number; dayjs: dayjs.Dayjs }>> = [];
  let currentWeek: Array<{ date: string; count: number; dayjs: dayjs.Dayjs }> = [];

  // 最初の日の曜日を取得（0=日曜日）
  const firstDay = days[0];
  const firstDayOfWeek = firstDay.dayjs.day();

  // 最初の週の前に空のセルを追加
  for (let i = 0; i < firstDayOfWeek; i++) {
    currentWeek.push({
      date: "",
      count: 0,
      dayjs: dayjs(),
    });
  }

  days.forEach((day, index) => {
    const dayOfWeek = day.dayjs.day();

    // 日曜日（0）で新しい週を開始（最初の週以外）
    if (dayOfWeek === 0 && currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }

    currentWeek.push(day);

    // 週が完成したら追加
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }

    // 配列の最後の要素の場合、残りの週を追加
    if (index === days.length - 1 && currentWeek.length > 0) {
      // 最後の週の残りを空のセルで埋める
      while (currentWeek.length < 7) {
        currentWeek.push({
          date: "",
          count: 0,
          dayjs: dayjs(),
        });
      }
      weeks.push(currentWeek);
    }
  });

  // 月のラベルとその位置を計算
  const generateMonthLabels = () => {
    const monthLabels: Array<{ label: string; position: number }> = [];
    let currentMonth = "";

    for (let weekIndex = 0; weekIndex < weeks.length; weekIndex++) {
      const week = weeks[weekIndex];
      for (const day of week) {
        if (day.date) {
          const monthLabel = day.dayjs.format("M月");
          if (monthLabel !== currentMonth) {
            currentMonth = monthLabel;
            monthLabels.push({
              label: monthLabel,
              position: weekIndex,
            });
          }
        }
      }
    }

    return monthLabels;
  };

  const monthLabels = generateMonthLabels();

  return (
    <div className="overflow-x-auto">
      <div className="flex flex-col space-y-2">
        {/* 月のラベル */}
        <div className="relative h-4">
          {monthLabels.map((month) => (
            <span
              key={`${month.label}-${month.position}`}
              className="absolute text-xs text-muted-foreground"
              style={{
                left: `${month.position * 16 + 2}px`,
              }}
            >
              {month.label}
            </span>
          ))}
        </div>

        {/* ヒートマップ */}
        <div className="flex space-x-1">
          {weeks.map((week, weekIndex) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <div key={weekIndex} className="flex flex-col space-y-1">
              {week.map((day, dayIndex) => (
                <div
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  key={`${weekIndex}-${dayIndex}`}
                  className={`w-3 h-3 rounded-sm border ${
                    day.date ? getColorIntensity(day.count) : "bg-transparent border-transparent"
                  }`}
                  title={day.date ? `${day.dayjs.format("YYYY年M月D日")}: ${day.count}件のアクティビティ` : ""}
                />
              ))}
            </div>
          ))}
        </div>

        {/* 凡例 */}
        <div className="flex items-center justify-end space-x-2 pt-2">
          <div className="text-xs text-muted-foreground">少ない</div>
          <div className="flex space-x-1">
            {COLORS.map((color, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              <div key={index} className={`w-3 h-3 rounded-sm border border-gray-200 ${color}`} />
            ))}
          </div>
          <div className="text-xs text-muted-foreground">多い</div>
        </div>
      </div>
    </div>
  );
}
