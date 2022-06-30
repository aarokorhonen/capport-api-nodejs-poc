const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(morgan("combined"));

const userPortalUrl =
    process.env.USER_PORTAL_URL || "https://example.org/portal.html";

const venueInfoUrl =
    process.env.VENUE_INFO_URL || "https://flight.example.com/entertainment";

app.use(function (req, res, next) {
    /*
        NOTE: see https://datatracker.ietf.org/doc/html/rfc8908#section-6
    */
    res.set("cache-control", "private");

    /*
        NOTE: in earlier versions of the draft, the value of Content-Type was
        specified differently, and originally as plain application/json.

        See RFC errata for details.
    */
    res.set("content-type", "application/captive+json");

    /*
        NOTE: see https://datatracker.ietf.org/doc/html/rfc8908#section-5
    */
    res.json({
        captive: true,
        "user-portal-url": userPortalUrl,
        "venue-info-url": venueInfoUrl,
        // NOTE: the following options don't generally make sense when captive:
        // "seconds-remaining": 326,
        // "can-extend-session": true,
    });
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Server running at localhost:${port}`);
});
