"use client";

import { useEffect, useMemo, useState } from "react";
import AdminGate from "../../../components/AdminGate";
import { supabase } from "../../../lib/supabase";

type Order = {
  id: string;
  product_name: string;
  unit_price: number;
  quantity: number;
  total_price: number;
  customer_name: string;
  customer_phone: string;
  delivery_method: string;
  store_info: string | null;
  note: string | null;
  payment_status: string | null;
  order_status: string | null;
  admin_note: string | null;
  created_at: string;
};

const statusOptions = [
  { value: "pending", label: "未付款" },
  { value: "paid", label: "已付款" },
  { value: "completed", label: "已完成" },
  { value: "cancelled", label: "已取消" },
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");
  const [keyword, setKeyword] = useState("");

  async function loadOrders() {
    setLoading(true);

    const { data, error } = await supabase
      .from("orders")
      .select(
        "id, product_name, unit_price, quantity, total_price, customer_name, customer_phone, delivery_method, store_info, note, payment_status, order_status, admin_note, created_at"
      )
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      alert("讀取訂單失敗，請檢查 Supabase orders 權限。");
      setLoading(false);
      return;
    }

    setOrders((data || []) as Order[]);
    setLoading(false);
  }

  useEffect(() => {
    loadOrders();
  }, []);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const status = order.order_status || order.payment_status || "pending";

      const matchStatus = filter === "all" || status === filter;

      const text = [
        order.product_name,
        order.customer_name,
        order.customer_phone,
        order.delivery_method,
        order.store_info || "",
        order.note || "",
      ]
        .join(" ")
        .toLowerCase();

      const matchKeyword = text.includes(keyword.trim().toLowerCase());

      return matchStatus && matchKeyword;
    });
  }, [orders, filter, keyword]);

  const totalRevenue = filteredOrders.reduce(
    (sum, order) => sum + Number(order.total_price || 0),
    0
  );

  async function updateOrder(
    id: string,
    values: Partial<Pick<Order, "order_status" | "admin_note" | "payment_status">>
  ) {
    setSavingId(id);

    const { error } = await supabase
      .from("orders")
      .update({
        ...values,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    setSavingId(null);

    if (error) {
      console.error(error);
      alert("更新失敗，請檢查 Supabase update policy。");
      return;
    }

    setOrders((current) =>
      current.map((order) =>
        order.id === id
          ? {
              ...order,
              ...values,
            }
          : order
      )
    );
  }

  return (
    <AdminGate>
      <main className="min-h-screen bg-[#F4E8D9] px-5 py-10 text-[#421211] md:px-10">
        <section className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-[#A82128]">
                Orders
              </p>
              <h1 className="mt-4 text-4xl font-black md:text-6xl">
                商品訂單管理
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-[#7A665B]">
                管理毛巾、球衣訂單，確認付款狀態、取貨方式與球衣客製資訊。
              </p>
            </div>

            <button
              type="button"
              onClick={loadOrders}
              className="rounded-full bg-[#421211] px-6 py-3 text-sm font-black text-white transition hover:bg-[#A82128]"
            >
              重新整理
            </button>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-4">
            <SummaryCard label="目前顯示訂單" value={`${filteredOrders.length}`} />
            <SummaryCard label="顯示訂單金額" value={`NT$${totalRevenue}`} />
            <SummaryCard
              label="未付款"
              value={`${orders.filter((o) => (o.order_status || o.payment_status || "pending") === "pending").length}`}
            />
            <SummaryCard
              label="已付款"
              value={`${orders.filter((o) => (o.order_status || o.payment_status) === "paid").length}`}
            />
          </div>

          <div className="mt-8 grid gap-4 rounded-[2rem] border border-[#D8C3AD] bg-white/70 p-5 shadow-sm md:grid-cols-[1fr_240px]">
            <input
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              placeholder="搜尋姓名、電話、商品、門市、備註..."
              className="rounded-2xl border border-[#D8C3AD] bg-white px-4 py-3 text-sm font-bold outline-none focus:border-[#A82128]"
            />

            <select
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              className="rounded-2xl border border-[#D8C3AD] bg-white px-4 py-3 text-sm font-bold outline-none focus:border-[#A82128]"
            >
              <option value="all">全部狀態</option>
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-8">
            {loading ? (
              <div className="rounded-[2rem] border border-[#D8C3AD] bg-white/70 p-10 text-center font-black">
                讀取訂單中...
              </div>
            ) : filteredOrders.length === 0 ? (
              <div className="rounded-[2rem] border border-[#D8C3AD] bg-white/70 p-10 text-center">
                <p className="text-2xl font-black">目前沒有符合條件的訂單</p>
              </div>
            ) : (
              <div className="grid gap-5">
                {filteredOrders.map((order) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    saving={savingId === order.id}
                    onUpdate={updateOrder}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </AdminGate>
  );
}

function SummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.5rem] border border-[#D8C3AD] bg-white/70 p-5 shadow-sm">
      <p className="text-xs font-black uppercase tracking-[0.22em] text-[#A82128]">
        {label}
      </p>
      <p className="mt-3 text-3xl font-black">{value}</p>
    </div>
  );
}

function OrderCard({
  order,
  saving,
  onUpdate,
}: {
  order: Order;
  saving: boolean;
  onUpdate: (
    id: string,
    values: Partial<Pick<Order, "order_status" | "admin_note" | "payment_status">>
  ) => void;
}) {
  const currentStatus = order.order_status || order.payment_status || "pending";
  const dateText = new Date(order.created_at).toLocaleString("zh-TW", {
    timeZone: "Asia/Taipei",
  });

  return (
    <article className="overflow-hidden rounded-[2rem] border border-[#D8C3AD] bg-white/75 shadow-sm">
      <div className="grid gap-5 border-b border-[#D8C3AD] p-5 md:grid-cols-[1.1fr_0.9fr_0.8fr] md:p-7">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.25em] text-[#A82128]">
            {dateText}
          </p>
          <h2 className="mt-3 text-3xl font-black">{order.product_name}</h2>
          <p className="mt-2 text-sm font-bold text-[#7A665B]">
            單價 NT${order.unit_price} × {order.quantity}
          </p>
          <p className="mt-3 text-3xl font-black text-[#A82128]">
            NT${order.total_price}
          </p>
        </div>

        <div className="space-y-3 text-sm">
          <Info label="姓名" value={order.customer_name} />
          <Info label="電話" value={order.customer_phone} />
          <Info label="取貨方式" value={order.delivery_method} />
          {order.store_info ? <Info label="7-11" value={order.store_info} /> : null}
        </div>

        <div>
          <label className="block">
            <span className="text-sm font-black text-[#7A665B]">訂單狀態</span>
            <select
              value={currentStatus}
              onChange={(event) =>
                onUpdate(order.id, {
                  order_status: event.target.value,
                  payment_status: event.target.value,
                })
              }
              className="mt-2 w-full rounded-2xl border border-[#D8C3AD] bg-white px-4 py-3 text-sm font-bold outline-none focus:border-[#A82128]"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <p className="mt-3 text-xs font-bold text-[#7A665B]">
            {saving ? "儲存中..." : "狀態變更會立即寫入 Supabase"}
          </p>
        </div>
      </div>

      <div className="grid gap-5 p-5 md:grid-cols-2 md:p-7">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#A82128]">
            商品備註 / 球衣資訊
          </p>
          <p className="mt-3 min-h-20 rounded-2xl border border-[#D8C3AD] bg-[#F4E8D9]/70 p-4 text-sm leading-7 text-[#421211]">
            {order.note || "無"}
          </p>
        </div>

        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#A82128]">
            管理備註
          </p>
          <textarea
            defaultValue={order.admin_note || ""}
            onBlur={(event) =>
              onUpdate(order.id, {
                admin_note: event.target.value,
              })
            }
            placeholder="例如：已核對匯款、已通知取貨、待補資料..."
            className="mt-3 min-h-20 w-full rounded-2xl border border-[#D8C3AD] bg-white px-4 py-3 text-sm leading-7 outline-none focus:border-[#A82128]"
          />
        </div>
      </div>
    </article>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-black uppercase tracking-[0.18em] text-[#A82128]">
        {label}
      </p>
      <p className="mt-1 break-words text-base font-black">{value}</p>
    </div>
  );
}