import { getProduct } from '../api';
import {parseRequestUrl} from '../utils';
import Rating from '../../components/rating'

const ProductScreen = {
    after_render: () => {
        const request = parseRequestUrl();
        document.getElementById('add-button').addEventListener('click',
        ()=> {
            document.location.hash = `/cart/${request.id}`;
        }
        )
    },
    render: async () => {
        const request = parseRequestUrl();
        const product = await getProduct(request.id);
        if(product.error){
            return(`<div>${product.error}</div>`);
        }
        return `
        <div class="content">
            <div class = "back-to-result">
                <a href="/#?">Back to results</a>
            </div>
            <div class="details">
                <div class="details-image">
                    <img src="${product.image}" alt="${product.name}"/>
                </div>
                <div class="details-info">
                    <ul>
                        <li>
                            <h1>${product.name}</h1>
                        </li>
                        <li>
                            ${Rating.render({
                                value: product.rating,
                                text: `${product.numReviews} reviews`
                            })}
                        </li>
                        <li>
                            Price: <strong>$${product.price}</strong>
                        </li>
                        <li>
                            Description: <div>${product.description}</div>
                        </li>
                        </ul>
                </div>
                <div class="details-action">
                    <ul>
                         <li>
                            Price: $${product.price}
                        </li>
                        <li>
                            Status: 
                            ${
                                product.countInStock > 0 
                                ? `<span class="success">In Stock</span>`
                                : `<span class="error">Out of Stock</span>`
                            }
                        </li>
                        <li> 
                            <button class="fw primary" id="add-button">Add to Cart</div>
                        </li>
                    </ul>
                </div>
        </div>
        `;
    },
};
export default ProductScreen;