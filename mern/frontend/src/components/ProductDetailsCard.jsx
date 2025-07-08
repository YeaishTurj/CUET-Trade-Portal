import React from "react";

function ProductDetailsCard({ product }) {
  if (!product) {
    return (
      <div>
        <p>Product not found</p>
      </div>
    );
  }

  const isForSale = [
    "fashion",
    "electronics",
    "digital",
    "pre-owned",
    "others",
  ].includes(product.category);
  const isLostFound = ["lost", "found"].includes(product.category);
  const isPreOwned = product.category === "pre-owned";

  return (
    <div>
      {/* Product Image */}
      <div>
        <img
          src={
            product.imageURL ||
            `https://via.placeholder.com/400?text=${encodeURIComponent(
              product.title
            )}`
          }
          alt={product.title}
        />
      </div>

      {/* Product Main Info */}
      <div>
        <div>
          <div>
            <h1>{product.title}</h1>
            <div>
              <span>{product.category}</span>
            </div>
          </div>
          {isForSale && (
            <div>
              <p>{`৳${product.price}`}</p>
              {product.perWhich && <p>{`per ${product.perWhich}`}</p>}
            </div>
          )}
        </div>

        {/* Description */}
        <div>
          <p>{product.description}</p>
        </div>

        {/* Category-Specific Sections */}
        {product.availableSizes && (
          <div>
            <h3>Available Sizes</h3>
            <div>
              {product.availableSizes.map((size) => (
                <span key={size}>{size}</span>
              ))}
            </div>
          </div>
        )}

        {product.features && (
          <div>
            <h3>Features</h3>
            <ul>
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        )}

        {isPreOwned && product.bids && (
          <div>
            <h3>Current Bids</h3>
            <div>
              {product.bids.map((bid, index) => (
                <div key={index}>
                  <span>{bid.user}</span>
                  <span>{`৳${bid.biddingPrice}`}</span>
                </div>
              ))}
            </div>
            {product.endsIn && <p>{`Auction ends in: ${product.endsIn}`}</p>}
          </div>
        )}

        {isLostFound && (
          <div>
            <h3>{product.category === "lost" ? "Lost" : "Found"} Details</h3>
            <div>
              <p>
                <span>Location:</span> {product.location}
              </p>
              {product.reporter && (
                <p>
                  <span>
                    {product.category === "lost" ? "Reporter" : "Finder"}:
                  </span>{" "}
                  {product.reporter}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Contact/Seller Info */}
        <div>
          <h3>{isLostFound ? "Contact" : "Seller"} Information</h3>
          <div>
            <p>
              <span>
                {isLostFound
                  ? product.category === "lost"
                    ? "Owner"
                    : "Finder"
                  : "Seller"}
                :
              </span>{" "}
              {product.seller || product.reporter}
            </p>
            <p>
              <span>Contact:</span> {product.contact}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div>
          {isForSale && (
            <button>{isPreOwned ? "Place Bid" : "Add to Cart"}</button>
          )}
          {isLostFound && (
            <button>
              {product.category === "lost" ? "I Found This" : "This is Mine"}
            </button>
          )}
          <button>Contact {isLostFound ? "" : "Seller"}</button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsCard;
