import AdminNav from "../../../components/AdminNav";

export default function AdminDonationsPage() {
  return (
    <main className="min-h-screen bg-[#F4E8D9] text-[#421211]">
      <AdminNav />
      <section className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-14">
        <h1 className="text-3xl font-black md:text-5xl">捐款紀錄</h1>
        <p className="mt-3 text-[#7A665B]">目前是手動管理版。之後可新增資料庫、新增表單與 CSV 匯出。</p>
      </section>
    </main>
  );
}
