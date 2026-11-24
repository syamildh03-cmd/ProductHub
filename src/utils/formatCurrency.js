// DummyJSON memberi harga dalam USD; dikonversi ke Rupiah dengan kurs tetap
// agar tampilan konsisten (bukan kurs real-time).
export const USD_TO_IDR = 16000

const rupiah = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0,
})

export function formatCurrency(usdAmount) {
  return rupiah.format(Math.round(usdAmount * USD_TO_IDR))
}
