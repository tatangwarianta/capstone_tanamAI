import StoryItem from '../view/story-item-view.js';

const dummyData = [
{
        id: 'padi-hawar-daun', 
        imageUrl: 'https://via.placeholder.com/300x200?text=Tanaman+Padi',
        plantType: 'Padi',
        disease: 'Hawar Daun Bakteri',
        description: 'Gejala berupa bercak kekuningan pada daun yang menyebar cepat.',
        treatment: 'Gunakan benih tahan penyakit, semprotkan bakterisida seperti streptomisin.'
},
{
        id: 'jagung-busuk-batang', 
        imageUrl: 'https://via.placeholder.com/300x200?text=Tanaman+Jagung',
        plantType: 'Jagung',
        disease: 'Busuk Batang',
        description: 'Batang menjadi lunak dan mudah patah karena infeksi jamur.',
        treatment: 'Perbaiki drainase, rotasi tanaman, dan gunakan fungisida sistemik.'
},
{
        id: 'kentang-layu-bakteri',
        imageUrl: 'https://via.placeholder.com/300x200?text=Tanaman+Kentang',
        plantType: 'Kentang',
        disease: 'Layu Bakteri',
        description: 'Daun menguning dan tanaman cepat layu meskipun cukup air.',
        treatment: 'Cabut tanaman terinfeksi, semprotkan bakterisida, dan sterilisasi alat tanam.'
},
{
        id: 'jagung-ulat-grayak',
        imageUrl: 'https://via.placeholder.com/300x200?text=Hama+Ulat+Grayak',
        plantType: 'Jagung',
        disease: 'Serangan Hama Ulat Grayak',
        description: 'Daun bolong-bolong, pertumbuhan tanaman terhambat.',
        treatment: 'Gunakan insektisida berbahan aktif klorpirifos atau spinosad. Lakukan monitoring rutin.'
}
];


const StoryItemPresenter = {
        async init(container) {
                const url = window.location.hash;
                const storyId = url.split('/')[2];

                const story = dummyData.find((item) => item.id === storyId);
                if (!story) {
                container.innerHTML = '<p>Story tidak ditemukan.</p>';
                return;
                }

                container.innerHTML = '';
                const element = StoryItem.render(story);
                container.appendChild(element);
        }
};

export default StoryItemPresenter;
