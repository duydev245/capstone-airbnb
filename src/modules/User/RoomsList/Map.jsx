import React from 'react'

const Map = ({ id, listLocation }) => {
    const maps = [
        {
            tenTinhThanh: "Hồ Chí Minh",
            linkMap: `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d501726.1646414578!2d106.07127147626535!3d10.754844246101994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529292e8d3dd1%3A0xf15f5aad773c112b!2zVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5oLCBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1724342759078!5m2!1svi!2s`
        },
        {
            tenTinhThanh: "Cần Thơ",
            linkMap: `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62860.622877846734!2d105.71637052066208!3d10.034268928598033!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0629f6de3edb7%3A0x527f09dbfb20b659!2zQ-G6p24gVGjGoSwgTmluaCBLaeG7gXUsIEPhuqduIFRoxqEsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1724341784681!5m2!1svi!2s`
        },
        {
            tenTinhThanh: "Nha Trang",
            linkMap: `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124762.63351940841!2d109.16410015538298!3d12.259625610462964!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3170677811cc886f%3A0x5c4bbc0aa81edcb9!2zTmhhIFRyYW5nLCBLaMOhbmggSMOyYSwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1724341918501!5m2!1svi!2s`
        },
        {
            tenTinhThanh: "Hà Nội",
            linkMap: `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59587.95149196312!2d105.75902241592615!3d21.022801972859618!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab9bd9861ca1%3A0xe7887f7b72ca17a9!2zSMOgIE7hu5lpLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1724341948763!5m2!1svi!2s`
        },
        {
            tenTinhThanh: "Phú Quốc",
            linkMap: `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d251289.71520420123!2d103.79261134649917!3d10.229141876492273!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a78c62b49eda17%3A0x8aa79fbbdd72cdb!2zUGjDuiBRdeG7kWM!5e0!3m2!1svi!2s!4v1724342009743!5m2!1svi!2s`
        },
        {
            tenTinhThanh: "Đà Nẵng",
            linkMap: `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d245367.87556434073!2d107.9133141381754!3d16.072075929687767!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219c792252a13%3A0x1df0cb4b86727e06!2zxJDDoCBO4bq1bmcsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1724342051890!5m2!1svi!2s`
        },
        {
            tenTinhThanh: "Đà Lạt",
            linkMap: `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124928.46940373944!2d108.36832085093964!3d11.904066868946709!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317112fef20988b1%3A0xad5f228b672bf930!2zVHAuIMSQw6AgTOG6oXQsIEzDom0gxJDhu5NuZywgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1724342072167!5m2!1svi!2s`
        },
        {
            tenTinhThanh: "Phan Thiết",
            linkMap: `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d250743.53678967577!2d108.00914572575647!3d10.897653062200572!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3176830f876e16e5%3A0x2a82c373d3a16cc8!2zVHAuIFBoYW4gVGhp4bq_dCwgQsOsbmggVGh14bqtbiwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1724342106289!5m2!1svi!2s`
        }
    ]

    const currentLocation = listLocation?.find(location => location.id == id);
    const currentMap = currentLocation ? maps?.find(map => map.tenTinhThanh === currentLocation.tinhThanh) : null;

    return (
        <>
            {currentMap && (
                <iframe
                    src={currentMap.linkMap}
                    width="600"
                    height="650"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
            )}
        </>

    )
}

export default Map
