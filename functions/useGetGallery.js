export default function useGetGallery() {
    const context = require.context("../assets/images", false, /.png$/);
    const resources = [];
    const urls = [
        '../assets/images/gallery/photo-gallery-1.jpg',
        'https://cogitent.ventures',
        'https://www.gains-associates.com',
        'https://galxe.com',
        'https://www.geekcartel.org',
        'https://gfiblockchain.com',
        'https://blockchainisrael.io',
        'https://www.lifeform.cc',
        'https://www.lucidblueventures.com',
        'https://near.org',
        'https://www.zebudigital.com'
    ];
    context.keys().forEach((key, index) => {
        const fileName = key.replace('./', '');
        const resource = require(`../assets/images/gallery/${fileName}`);
        resources.push({
            image: resource,
            url: urls[index]
        });
    });
    return resources;
}