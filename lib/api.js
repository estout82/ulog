
export function getBasePath() {
    if (proccess.env["NODE_ENV"] != "production") {
        return "http://localhost:3000"
    } else {
        return "https://ulog-api.ericstoutenburg.com/";
    }
}