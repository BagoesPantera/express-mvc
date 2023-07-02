const { PrismaClient } = require("@prisma/client");
const { generateHash } = require("../lib/bcrypt");

const prisma = new PrismaClient();

const products = [
  {
    name: "Arduino UNO",
    qty: 12,
    available: true,
    desc: "Arduino UNO is a microcontroller board based on the ATmega328P. It has 14 digital input/output pins (of which 6 can be used as PWM outputs), 6 analog inputs, a 16 MHz ceramic resonator, a USB connection, a power jack, an ICSP header and a reset button. It contains everything needed to support the microcontroller; simply connect it to a computer with a USB cable or power it with a AC-to-DC adapter or battery to get started. You can tinker with your UNO without worrying too much about doing something wrong, worst case scenario you can replace the chip for a few dollars and start over again.",
    price: 150000,
    img: "noimage.jpg",
    categoryId: 1,
  },
  {
    name: "ESP8266",
    qty: 10,
    available: true,
    desc: "The ESP8266 is a low-cost Wi-Fi microchip, with built-in TCP/IP networking software, and microcontroller capability, produced by Espressif Systems in Shanghai, China.The chip was popularized in the English-speaking maker community in August 2014 via the ESP-01 module, made by a third-party manufacturer Ai-Thinker. This small module allows microcontrollers to connect to a Wi-Fi network and make simple TCP/IP connections using Hayes-style commands.",
    price: 55000,
    img: "noimage.jpg",
    categoryId: 1,
  },
  {
    name: "Flame Sensor",
    qty: 20,
    available: true,
    desc: "A flame sensor definition is a type of detector that is used to detect as well as react to the occurrence of a fire or flame. A flame sensor frequently responds faster & more precisely as compared to a heat or smoke sensor because of the mechanisms it utilizes to notice the flame. Flame sensors are usually used to verify whether the furnaces are functioning correctly. These sensors are also used in an ignition system to get precise actions otherwise to inform the operator.",
    price: 12000,
    img: "noimage.jpg",
    categoryId: 2,
  },
];

const categories = [
  {name: "Microcontroller"},
  {name: "Sensor"},
]

async function main() {
  for(const category of categories) {
    await prisma.category.create({
      data: category
    })
  }

  for(const product of products) {
    await prisma.product.create({
      data: product,
    });
  }

  await prisma.user.create({
    data: {
      username: "admin",
      password: await generateHash("123456")
    }
  })

  console.log("Seed data success");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
