import $ from "jquery";
import moment from "moment";

function time() {
    const displayTime = () => {
        moment.locale("id");
        $(".day").text(moment().format("dddd"));
        $(".date").text(moment().format("ll"));
        $(".hour").text(moment().format("LTS"));

    };

    const updateTime = () => {
        displayTime();
        setTimeout(updateTime, 1000);
    };

    updateTime();
}

export default time;
