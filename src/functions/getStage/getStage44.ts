export async function getStage44(id: any) {
    const response = await fetch(`https://zakupki.gov.ru/epz/order/notice/ea20/view/common-info.html?regNumber=${id}`);
    const html = await response.text();
    const xpath = "/html/body/div[2]/div/div[1]/div[2]/div[2]/div/div/div/div[1]/div[1]/div[2]/div[2]/text()"

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