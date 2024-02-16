import axios from "axios";

export async function getStage223(id: any) {
    const response = await axios.get(`https://zakupki.gov.ru/epz/order/extendedsearch/results.html?searchString=${id}`, {headers: {
        "User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Mobile Safari/537.36"
    }});
    const html = await response.data;
    const xpath = `//*[@id="quickSearchForm_header"]/section[2]/div/div/div[1]/div[3]/div/div/div[1]/div[1]/div[2]/div[2]`

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(html, "text/html");

    const result = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null);
    let content = "";
    let node = result.iterateNext();
    while (node) {
        content += node.textContent;
        node = result.iterateNext();
    }

    return content;
}