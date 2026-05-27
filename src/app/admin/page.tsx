import AdminGate from "../../components/AdminGate";

export default function AdminPage() {
  return (
    <AdminGate>
      <main className="min-h-screen bg-[#F4E8D9] px-5 py-12 text-[#421211] md:px-10">
        <section className="mx-auto max-w-6xl">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#A82128]">
            Control Panel
          </p>

          <h1 className="mt-4 text-4xl font-black md:text-6xl">
            PROJECT 10 後台
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#7A665B]">
            這裡用來管理網站文字、照片、商品訂單與捐款資訊。
          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <a
              href="/admin/settings"
              className="rounded-[2rem] border border-[#D8C3AD] bg-white/70 p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <p className="text-xs font-black uppercase tracking-[0.25em] text-[#A82128]">
                Site Settings
              </p>
              <h2 className="mt-4 text-3xl font-black">網站內容設定</h2>
              <p className="mt-4 text-sm leading-7 text-[#7A665B]">
                修改首頁標題、標語、Chapter 文字與照片區說明。
              </p>
            </a>

            <a
              href="/admin/orders"
              className="rounded-[2rem] border border-[#D8C3AD] bg-white/70 p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <p className="text-xs font-black uppercase tracking-[0.25em] text-[#A82128]">
                Orders
              </p>
              <h2 className="mt-4 text-3xl font-black">商品訂單管理</h2>
              <p className="mt-4 text-sm leading-7 text-[#7A665B]">
                查看毛巾與球衣訂單、聯絡方式、取貨方式與付款狀態。
              </p>
            </a>
          </div>
        </section>
      </main>
    </AdminGate>
  );
}