import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const productApi = createApi({
    name:'product',
    baseQuery : fetchBaseQuery({baseUrl : "http://localhost:5000/api/product",credentials:"include"}),
    tagTypes: ['product'],
    endpoints:(builder)=>({
        addProduct : builder.mutation({
            query : (data)=>({
                url:'/addProduct',
                method: "POST",
                body : data
            }),
            invalidatesTags : ["product"]
        }),
        getProduct:builder.query({
            query:()=>'/',
            providesTags: ['product']
        }),
        deleteProduct : builder.mutation({
            query : (id)=>({
                url:`/delete/${id}`,
                method: "POST",
            }),
            invalidatesTags : ["product"]
        }),
        updateProduct: builder.mutation({
            query: ({ id, data }) => ({
              url: `/update/${id}`,
              method: 'PUT',
              body: data,
            }),
            invalidatesTags : ["product"]
          }),
        
        editProduct:builder.query({
            query:(id)=>`/edit/${id}`,
            providesTags: ['product']
        }),
        
    })
})
export const {useAddProductMutation,useGetProductQuery,useDeleteProductMutation,useUpdateProductMutation,useEditProductQuery} = productApi;
export default productApi;