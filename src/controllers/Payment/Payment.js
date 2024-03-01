const stripe = require("stripe")('sk_test_51OJFtaJGJZCx19l2hj8goxXm6PV9pkFiTEBL5WaoT3miSrwCixptlGfHrikiBWlbfwz2xK7Rp3IpiuqOSeGB7BsN00xqfWW4uI');
exports.Payment = async (req, res) => {
    const { price } = req.body;
    const amount = price * 100
    console.log(price, amount)

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "eur",
        // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
        payment_method_types: [
            "card"
        ],

    });

    res.send({
        clientSecret: paymentIntent.client_secret,
    });
};
