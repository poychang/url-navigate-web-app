import { Router, RouterMode } from "./router";

const router = new Router({
    mode: RouterMode.Hash,
    root: "/"
});

router
    .add("about", () => {
        alert("welcome in about page");
    })
    .add("", () => {
        // general controller
        console.log("welcome in catch all controller");
    });
