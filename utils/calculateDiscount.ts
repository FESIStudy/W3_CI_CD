export function calculateDiscount(price: number, userType: string): number {
  if (userType === "premium") {
    return price * 0.8; // 20% 할인
  } else if (userType === "gold") {
    return price * 0.9; // 10% 할인
  } else if (userType === "silver") {
    return price * 0.95; // 5% 할인
  } else {
    return price; // 일반 유저는 할인 없음
  }
}
