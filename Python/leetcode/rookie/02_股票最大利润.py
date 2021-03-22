
def maxProfit(prices = []):
  return sum([prices[i+1]-prices[i] for i in range(len(prices)-1) if prices[i+1]-prices[i] > 0])

a = maxProfit([7,6,4,3,2,8])
print(a)