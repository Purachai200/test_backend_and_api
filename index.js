const express = require("express");
const { PrismaClient } = require("@prisma/client");
const qr = require("qr-image");

const app = express();
const prisma = new PrismaClient();

// GET /stores
app.get("/stores", async (req, res) => {
    try {
        const discounts = await prisma.store.findMany({
    include: {
        discounts: true,
        },
    });
    res.json(discounts);
    } catch (error) {
    res.status(500).json({ message: "Internal server error" });
}
});

// GET /stores/:id
app.get("/stores/:id", async (req, res) => {
    try {
        const storeId = parseInt(req.params.id);
        const discount = await prisma.discount.findUnique({
    where: {
        id: storeId,
    },
    include: {
        store: true,
    },
    });
    if (!discount) {
        return res.status(404).json({ message: "Discount not found" });
    }
    res.json(discount);
} catch (error) {
    res.status(500).json({ message: "Internal server error" });
}
});

// POST /stores/:id/claim
app.post("/stores/:id/claim", async (req, res) => {
    try {
        const storeId = parseInt(req.params.id);
        const userId = 1; // Replace this with the actual user ID
        const discount = await prisma.discount.findUnique({
    where: {
        id: storeId,
    },
    });

    if (!discount) {
        return res.status(404).json({ message: "Discount not found" });
    }

    const claim = await prisma.claim.create({
        data: {
        userId: userId,
        discountId: storeId,
        claimedAt: new Date(),
        },
    });

    res.json(claim);
} catch (error) {
    res.status(500).json({ message: "Internal server error" });
    }
});

// GET /qr/:id
app.get("/qr/:id", async (req, res) => {
try {
    const storeId = parseInt(req.params.id);
    const discount = await prisma.discount.findUnique({
        where: {
        id: storeId,
        },
        include: {
            store: true,
        },
    });

    if (!discount) {
        return res.status(404).json({ message: "Discount not found" });
    }

    const qrData = `Store: ${discount.store.name}, Discount: ${discount.description}`;
    const qrImage = qr.image(qrData, { type: "png" });
    qrImage.pipe(res);
    } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
