import React, { useContext, useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Context } from "../context/Context";
import Swal from "sweetalert2";

const LOG_OUT = gql`
  mutation Mutation {
    logOut
  }
`;

const GET_PRODUCTOS_CARRITO_USER = gql`
  query GetProductosCarritoUser {
    getProductosCarritoUser {
      _id
      cantidad
      id_producto
      id_user
      name
      precioTotal
      precioTotal_freeIVA
      img
    }
  }
`;

// 
// * Componente botones del usuario loggeado.
// * Botones del perfil y el carrito
// 
function BotonesUserLogged() {
  // Variables del contexto usadas
  const {
    changeReload,
    token,
    changeViewShoppingCart,
    changeViewProductos,
    changeViewInicio,
    changeViewOrigen,
    changeViewMaderas,
    changeViewContacto,
    changeViewPedidosPerfil,
    changeViewDetallePedido,
    changeViewHacerPedido,
    changeViewSession,
    changeViewProductSelect,
    changeViewPerfil,
    changeErrorTrue,
    changeErrorFalse,
    changeCodigoError,
    changeMensajeError
  } = useContext(Context);
  const [OpenSubMenuPerfil, setOpenSubMenuPerfil] = useState(false);

  // Mutation para cerrar sesión
  const [logOut] = useMutation(LOG_OUT, {
    context: {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    },

    onCompleted: () => {
      localStorage.removeItem("token");
      changeReload();
    },
    onError: (error) => {
      //si hay un error, borrar el token
      console.log(error);
      localStorage.removeItem("token");
      changeReload();
    },
  });

  // Query para traer los productos del carrito del user de la bbdd
  const { data, loading, error } = useQuery(GET_PRODUCTOS_CARRITO_USER, {
    context: {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    },
  });

  if (loading) return <div></div>;
  if (error)
    return (
      <div>
        {changeErrorTrue()} {changeCodigoError(404)}
        {changeMensajeError("Not Found")}
      </div>
    );

    //modal de confirmación al cerrar sesión
    function mostrarConfirmación() {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: '¡Hasta pronto!',
        showConfirmButton: false,
        timer: 1500
      });
    }

  return (
    <div>
      {token && (
        <div className="flex justify-end -mt-10 text-white font-bold mr-8">
          {/* carrito */}
          <div>
            <button
              type="button"
              className="bg-[url('/home/guillermo/App_TFG/front/src/assets/carrito.png')] bg-no-repeat bg-cover h-12 w-16 p-2 mr-3 hover:opacity-80"
              onClick={() => {
                changeViewShoppingCart(true),
                  changeViewProductos(false),
                  changeViewInicio(false),
                  changeViewOrigen(false),
                  changeViewMaderas(false),
                  changeViewContacto(false),
                  changeViewPedidosPerfil(false),
                  changeViewDetallePedido(false),
                  changeViewHacerPedido(false),
                  changeViewPerfil(false);
                changeErrorFalse(false);
              }}
            ></button>
            {data.getProductosCarritoUser.length != 0 && (
              <span className="-ml-3 mr-4 bg-orange-500 rounded-full  px-3 py-2">
                <span className="">{data.getProductosCarritoUser.length}</span>
              </span>
            )}
          </div>

          {/* perfil */}
          <div className="relative inline-block text-left">
            <div>
              <button
                type="button"
                className="bg-[url('/home/guillermo/App_TFG/front/src/assets/fotoPerfil.png')] bg-no-repeat bg-cover h-12 w-16 hover:opacity-80"
                id="menu-button-perfil"
                aria-expanded="true"
                aria-haspopup="true"
                onClick={() => setOpenSubMenuPerfil(!OpenSubMenuPerfil)}
              ></button>
            </div>

            {OpenSubMenuPerfil && (
              <div
                className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabIndex="-1"
              >
                <div className="py-1" role="none">
                  <a
                    href="#"
                    className="text-gray-700 block px-4 py-2 text-sm hover:text-orange-600"
                    role="menuitem"
                    tabIndex="-1"
                    id="menu-item-0"
                    onClick={() => {
                      changeViewPerfil(true),
                        changeViewShoppingCart(false),
                        changeViewProductos(false),
                        changeViewInicio(false),
                        changeViewOrigen(false),
                        changeViewMaderas(false),
                        changeViewContacto(false),
                        changeViewPedidosPerfil(false),
                        changeViewDetallePedido(false),
                        changeViewHacerPedido(false);
                      changeErrorFalse(false);
                    }}
                  >
                    Perfil
                  </a>
                </div>

                {/* pedidos */}
                <div className="py-1" role="none">
                  <a
                    href="#"
                    className="text-gray-700 block px-4 py-2 text-sm hover:text-orange-600"
                    role="menuitem"
                    tabIndex="-1"
                    id="menu-item-1"
                    onClick={() => {
                      changeViewPedidosPerfil(true),
                        changeViewDetallePedido(false),
                        changeViewShoppingCart(false),
                        changeViewProductos(false),
                        changeViewProductSelect(false),
                        changeViewInicio(false),
                        changeViewOrigen(false),
                        changeViewMaderas(false),
                        changeViewContacto(false),
                        changeViewHacerPedido(false),
                        changeViewSession(false),
                        changeViewPerfil(false);
                      changeErrorFalse(false);
                    }}
                  >
                    Pedidos
                  </a>
                </div>

                {/* cerrar sesión */}
                <div className="py-1" role="none">
                  <a
                    href="#"
                    className="text-gray-700 block px-4 py-2 text-sm hover:text-orange-600"
                    role="menuitem"
                    tabIndex="-1"
                    id="menu-item-2 on"
                    onClick={() => {
                      logOut();
                      mostrarConfirmación(),
                        setOpenSubMenuPerfil(false),
                        changeViewPedidosPerfil(false),
                        changeViewDetallePedido(false),
                        changeViewShoppingCart(false),
                        changeViewProductos(false),
                        changeViewProductSelect(false),
                        changeViewInicio(true),
                        changeViewOrigen(false),
                        changeViewMaderas(false),
                        changeViewContacto(false),
                        changeViewHacerPedido(false),
                        changeViewSession(false),
                        changeViewPerfil(false);
                      changeErrorFalse(false);
                      console.log(
                        "me desloggeo, token: " + localStorage.getItem("token")
                      );
                      localStorage.removeItem("token");
                      console.log(
                        "me he desloggeado, token: " + localStorage.getItem("token")
                      );
                    }}
                  >
                    Cerrar Sesión
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default BotonesUserLogged;
