import { createFileRoute } from "@tanstack/react-router";
import {
  getListings,
  addListing,
  updateListing,
  deleteListing,
} from "../api/seller";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export const Route = createFileRoute("/seller")({
  component: SellerDashboard,
});

function SellerDashboard() {
  const [isVisible, setIsVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isVisibleUpdate, setIsVisibleUpdate] = useState(false);
  const [isVisibleDelete, setIsVisibleDelete] = useState(false);
  const queryClient = useQueryClient();
  const { isLoading, data } = useQuery({
    queryKey: ["listings"],
    queryFn: getListings,
    staleTime: 30000,
  });
  const mutation = useMutation({
    mutationFn: function (e) {
      e.preventDefault();
      const formData = new FormData(e.target);
      return addListing(
        formData.get("title"),
        formData.get("description"),
        formData.get("category"),
        formData.get("price"),
        formData.get("stock"),
        formData.get("shipping_info"),
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["listings"],
      });
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    },
  });
  const mutationUpdate = useMutation({
    mutationFn: function (e) {
      e.preventDefault();
      const formData = new FormData(e.target);
      return updateListing(
        formData.get("id"),
        formData.get("title"),
        formData.get("description"),
        formData.get("category"),
        formData.get("price"),
        formData.get("stock"),
        formData.get("shipping_info"),
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["listings"],
      });
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    },
  });
  const mutationDelete = useMutation({
    mutationFn: function (e) {
      e.preventDefault();
      const formData = new FormData(e.target);
      return deleteListing(formData.get("id"));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["listings"],
      });
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    },
  });
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className="seller-dashboard">
      <button onClick={() => setIsVisible(!isVisible)}>Add Listing</button>
      <button onClick={() => setIsVisibleUpdate(!isVisibleUpdate)}>
        Update Listing
      </button>
      <button onClick={() => setIsVisibleDelete(!isVisibleDelete)}>
        Delete Listing
      </button>
      {isVisible && (
        <>
          {submitted && <h3>Submitted!</h3>}
          <form onSubmit={mutation.mutate}>
            <input name="title" type="text" placeholder="Enter title" />
            <input
              name="description"
              type="text"
              placeholder="Enter description"
            />
            <input name="category" type="text" placeholder="Enter category" />
            <input name="price" type="number" placeholder="Enter price" />
            <input name="stock" type="number" placeholder="Enter stock" />
            <input
              name="shipping_info"
              type="text"
              placeholder="Enter shipping info"
            />
            <button>Submit</button>
          </form>
        </>
      )}
      {isVisibleUpdate && (
        <>
          {submitted && <h3>Submitted!</h3>}
          <form onSubmit={mutationUpdate.mutate}>
            <input name="id" type="number" placeholder="Enter Id" />
            <input name="title" type="text" placeholder="Enter title" />
            <input
              name="description"
              type="text"
              placeholder="Enter description"
            />
            <input name="category" type="text" placeholder="Enter category" />
            <input name="price" type="number" placeholder="Enter price" />
            <input name="stock" type="number" placeholder="Enter stock" />
            <input
              name="shipping_info"
              type="text"
              placeholder="Enter shipping info"
            />
            <button>Submit</button>
          </form>
        </>
      )}
      {isVisibleDelete && (
        <>
          {submitted && <h3>Submitted</h3>}
          <form onSubmit={mutationDelete.mutate}>
            <input type="number" name="id" placeholder="Enter Id" />
            <button>Submit</button>
          </form>
        </>
      )}
      <div className="listing-grid">
        {data.length > 0 ? (
          data.map((item) => {
            return (
              <article className="listing-card" key={item.id}>
                <h1>
                  {item.title} <span>#{item.id}</span>
                </h1>
                <p className="listing-description">{item.description}</p>
                <p className="listing-category">{item.category}</p>
                <p className="listing-price">${item.price}</p>
                <p className="listing-stock">{item.stock} in stock</p>
                <p className="listing-shipping">{item.shipping_info}</p>
              </article>
            );
          })
        ) : (
          <h1>None</h1>
        )}
      </div>
    </div>
  );
}
