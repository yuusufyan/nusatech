const responseTimes = [
  { endpoint: "/api/v1/users", time: 120 },
  { endpoint: "/api/v1/products", time: 80 },
  { endpoint: "/api/v1/orders", time: 150 },
];

async function avgResponseTime(data) {
  try {
    const totalTime = data.reduce((acc, curr) => acc + curr.time, 0);
    const averageTime = totalTime / data.length;
    console.log(`Average response time: ${averageTime.toFixed(2)} ms`);
  } catch (err) {
    console.log("Failed to get Average Response Time");
  }
}

avgResponseTime(responseTimes);
