const displayData = (limit) => {
	const URL = 'https://openapi.programming-hero.com/api/ai/tools';
	fetch(URL)
		.then((res) => res.json())
		.then((data) => 
        getSingleData(data.data.tools, limit));
        // seeMoreCards(data));
        // console.log(data.data.tools));
};

const getSingleData = (data, limit) =>{ 
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerText = "";
    if (limit && data.length > limit){
        data = data.slice(0, limit)

    }else{
        document.getElementById('see-more').classList.add("hidden");
    }
     data.forEach((singleData) => {
				// console.log(singleData.id);

				cardContainer.innerHTML += `
            
            <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <a href="#">
                        <img class="rounded-t-lg h-[200px] w-full" src="${
													singleData.image
												}" alt="" />
                    </a>
                    <div class="p-5">
                        <a href="#">
                            <h5 class="mb-2 text-base font-semibold text-text-color-1">Feature</h5>
                        </a>
                        <div class="flex items-start h-[100px]">
                            <ol id="feature-list" class="list-decimal text-text-color-2 p-5 pt-0">
                            ${singleData.features
															.map((feature) => `<li>${feature}</li>`)
															.join('')}

                        </ol>
                        </div>
                        

                        <hr>

                        <div class="flex justify-between content-center mt-4">
                            <div>
                                <p class="mb-2 text-base font-semibold text-text-color-1">${
																	singleData.name
																}</p>
                                <div class="flex gap-2 text-text-color-2">
                                    <i class="fa-solid fa-calendar-days text-text-color-2 mt-1"></i>
                                    <p>${singleData.published_in}</p>
                                </div>

                            </div>
                            <div>
                                <button class="bg-red-100 rounded-full mt-3"  onclick="openModal();  showDetails('${
																	singleData.id
																}')">
                                    <svg aria-hidden="true" class="w-5 h-5 m-2 text-btn-color" fill="currentColor"
                                        viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd"
                                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                            clip-rule="evenodd"></path>
                                    </svg>

                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            
            `;
            loader(true);
			});
}


const loader = (loading) =>{
    const spinner = document.getElementById("spinner");
    if (loading){
        spinner.classList.add("hidden");
    }
    else{
        spinner.classList.remove('hidden');

		}

}
loader(false);
displayData(6);

const openModal =()=>{
    document.getElementById('detail-modal').checked = true;
}

const showDetails = (id) => {
	let URL = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
	console.log(URL)
    

	fetch(URL)
		.then((res) => res.json())
		.then((data) => 
        getDetails(data?.data));
};


const getDetails = (detail) =>{
	const modalContainer = document.getElementById('modal-container');
	// console.log(detail.accuracy.score);

	// console.log(detail.accuracy);
	// console.log(detail.pricing[2].price);
	// const price = detail.pricing[0].price.slice(0,3);
	// console.log(price);
	modalContainer.innerHTML = `
    <!-- card-left  -->
                <div class="md:w-1/2 border border-gray-200 rounded-lg shadow bg-[#fef7f7] border-red-400 text-center">
        
                    <div class="p-5">
                        <a href="#">
                            <h5 id="detail-description" class="mb-2 text-base font-semibold text-text-color-1 text-left">${
															detail.description
														}</h5>
        
                            <!-- <div class="flex flex-col gap-2 md:flex justify-around">   -->
        
                            <div class="flex justify-around">
                                <div class="bg-white p-5 w-[30%] font-bold text-base text-center rounded-lg text-[#03A30A]">
                                    
                                    ${(detail.pricing[0].price = 0 || detail.pricing[0].price === 'No cost'
																				? 'Free<br>of<br>Cost'
																				: detail.pricing[0].price.slice(0, 3) +
																				  '<br>/month<br>Basic')}

                                </div>
                                <div class="bg-white p-5 w-[30%] font-bold text-base text-center rounded-lg text-[#F28927]">
                                ${
																	detail.pricing[1].price === '0' ||
																	detail.pricing[1].price === 'No cost' ||
																	detail.pricing[1].price === null
																		? 'Free<br>of<br>Cost'
																		: detail.pricing[1].price.slice(0, 3) +
																		  '<br>/month<br>Pro'
																}

                                </div>
                                
        
                                <div class="bg-white py-5  w-[30%] font-bold text-base text-center rounded-lg text-[#EB5757]">
                                ${detail.pricing[2].price}<br>Enterprise
                                 
        
                                </div>
                            </div>
        
                            <div
                                class="flex flex-col md:flex md:flex-row justify-between gap-4 text-center font-bold text-base mt-5">
                                <div class="md:text-left  w-full">
                                    <a href="#">
                                        <h5 class="mb-2 text-base font-semibold text-text-color-1">Feature</h5>
                                    </a>
                                    <ul class="list-disc text-text-color-2 p-5 text-base font-normal" id="features">
                                       
                                    </ul>
                                </div>
                                <div class="md:text-left w-full">
                                    <div>
                                        <a href="#">
                                            <h5 class="mb-2 text-base font-semibold text-text-color-1">Integrations</h5>
                                        </a>
                                        <ul class="list-disc text-text-color-2 p-5 text-base font-normal" id="integrations">
                                            
                                        </ul>
                                    </div>
                                </div>
                            </div>
        
                    </div>
                </div>
        
                <!-- card-right  -->
                <div
                    class="md:w-1/2 bg-white border border-gray-200 rounded-lg shadow border-gray-300 text-center p-5 relative">
                    <a href="#">
                        <img class="rounded-t-lg w-full h-[250px]" src="${
													detail.image_link[0]
												}" alt="" />
        
                    </a>
                    <div class="p-5">
                        <a href="#">
                            <h5 class="mb-2 text- font-semibold text-text-color-1">${
															detail.input_output_examples[1].input
																? detail.input_output_examples[1].input
																: 'Can you give any example?'
														}</h5>
                        </a>
                        <p class="list-decimal text-text-color-2 p-5">${
													detail.input_output_examples[1].input
														? detail.input_output_examples[1].output.slice(
																0,
																177
														  )
														: 'No! Not Yet! Take a break!!!'
												}</p>
        
                    </div>
                
                    <button type="button"
                        class="text-white bg-btn-color font-semibold rounded-lg text-base px-4 py-1 m-8 absolute top-[-5px] right-[-5px]" id="accuracy">${
													detail.accuracy.score !== 'null'
														? detail.accuracy.score * 100
														: ''
												} % accuracy
                        </button>
                </div>

                <div class="modal-action z-1000">
                    <label for="detail-modal">
        
                        <i
                            class="fa-solid fa-circle-xmark text-btn-color text-5xl absolute top-0 right-0 md:top-[-5px] md:right-[-5px] bg-white rounded-full"></i>
                    </label>
                </div>
                
    `;

	if (Object.keys(detail.features).length !== 0) {
		const list = document.getElementById('features');

		for (const feature in detail.features) {
			const listItem = document.createElement('li');
			// console.log(detail.features[feature].feature_name);
			listItem.innerText = detail.features[feature].feature_name;
			list.appendChild(listItem);
		}
	} else {
		document.getElementById('feature').innerText = 'No data Found';
	}
	if (detail.integrations !== null) {
		const list = document.getElementById('integrations');
		detail.integrations.forEach((integration) => {
			const listItem = document.createElement('li');
			listItem.innerText = integration;
			list.appendChild(listItem);
		});
	} else {
		document.getElementById('integrations').classList.remove('pl-6');
		document.getElementById('integrations').innerText = 'No data Found';
	}

	if (detail.accuracy.score == null) {
		document.getElementById('accuracy').classList.add('hidden');
	} else {
		document.getElementById('accuracy').classList.remove('hidden');
	}
}