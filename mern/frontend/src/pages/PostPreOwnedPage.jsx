import React from "react";
import PostProduct from "../components/PostProduct";

const PostPreOwnedPage = () => {
  return (
    <section className="py-20  min-h-screen">
      <div className="container mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-blue-900 mb-4">
            Post a Pre-Owned Item
          </h1>

        </div>

        {/* PostProduct component for posting a found item */}
        <PostProduct category="pre-owned" />
      </div>
    </section>
  );
};

export default PostPreOwnedPage;
