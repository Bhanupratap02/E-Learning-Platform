/** @format */

const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();
const categories = [
  { name: "Software Development" },
  { name: "IT & Software" },
  { name: "Business" },
  { name: "Marketing" },
  { name: "Lifestyle" },
  { name: "Photography & Video" },
  { name: "Health & Fitness" },
  { name: "Music" },
  { name: "Finance & Accounting" },
  { name: "Personal Development" },
];
async function main() {
  try {
    await database.category.createMany({
        data: categories,
    })
    console.log("Success");
    
  } catch (error) {
    console.log("Error seeding the database categories",error);
  } finally{
    await database.$disconnect()
  }
}
main()