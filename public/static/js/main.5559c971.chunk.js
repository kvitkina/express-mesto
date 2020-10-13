(this["webpackJsonpmesto-react"] = this["webpackJsonpmesto-react"] || []).push([
  [0],
  {
    10: function (e, t, a) {
      e.exports = a(16);
    },
    15: function (e, t, a) {},
    16: function (e, t, a) {
      "use strict";
      a.r(t);
      var n = a(0),
        o = a.n(n),
        r = a(5),
        c = a.n(r),
        i = (a(15), a(9)),
        l = a(1),
        s = a(6),
        u = a.n(s);
      var p = function () {
        return o.a.createElement(
          "header",
          { className: "header" },
          o.a.createElement("img", {
            src: u.a,
            className: "logo",
            alt: "\u041b\u043e\u0433\u043e\u0442\u0438\u043f",
          })
        );
      };
      var m = function () {
          return o.a.createElement(
            "footer",
            { className: "footer" },
            o.a.createElement(
              "h4",
              { className: "footer__author" },
              "\xa9 2020 Mesto Russia"
            )
          );
        },
        d = o.a.createContext();
      var _ = function (e) {
        var t = e.card,
          a = e.onCardClick,
          n = e.onCardDelete,
          r = e.onCardLike,
          c = e.onCardDislike,
          i = o.a.useContext(d),
          l = t.owner._id === i._id,
          s = t.likes.some(function (e) {
            return e._id === i._id;
          }),
          u = "element__like ".concat(s && "element__like_theme_black");
        return o.a.createElement(
          "li",
          { className: "element" },
          o.a.createElement("img", {
            style: { backgroundImage: "url(".concat(t.link, ")") },
            className: "element__image",
            alt: "",
            onClick: function () {
              a(t);
            },
          }),
          l &&
            o.a.createElement("button", {
              className: "element__trash",
              onClick: function () {
                n(t._id);
              },
            }),
          o.a.createElement(
            "div",
            { className: "element__info" },
            o.a.createElement("h3", { className: "element__title" }, t.name),
            o.a.createElement(
              "div",
              { className: "element__like-container" },
              o.a.createElement("button", {
                className: u,
                onClick: s
                  ? function () {
                      c(t);
                    }
                  : function () {
                      r(t);
                    },
              }),
              o.a.createElement(
                "p",
                { className: "element__like-counter" },
                t.likes.length
              )
            )
          )
        );
      };
      var f = function (e) {
        var t = e.onEditAvatar,
          a = e.onEditProfile,
          n = e.onAddPlace,
          r = e.onCardClick,
          c = e.cards,
          i = e.onCardLike,
          l = e.onCardDislike,
          s = e.onCardDelete,
          u = o.a.useContext(d);
        return o.a.createElement(
          "main",
          { className: "content" },
          o.a.createElement(
            "section",
            { className: "profile" },
            o.a.createElement("button", {
              className: "profile__avatar",
              style: { backgroundImage: "url(".concat(u.avatar, ")") },
              onClick: t,
            }),
            o.a.createElement(
              "div",
              { className: "profile__info" },
              o.a.createElement("h1", { className: "profile__name" }, u.name),
              o.a.createElement("button", {
                className: "profile__edit-button",
                onClick: a,
              }),
              o.a.createElement("p", { className: "profile__job" }, u.about)
            ),
            o.a.createElement("button", {
              className: "profile__add-button",
              onClick: n,
            })
          ),
          o.a.createElement(
            "div",
            { className: "elements" },
            o.a.createElement(
              "ul",
              { className: "elements__list" },
              c.map(function (e) {
                return o.a.createElement(_, {
                  key: e._id,
                  card: e,
                  onCardClick: r,
                  onCardDelete: s,
                  onCardLike: i,
                  onCardDislike: l,
                });
              })
            )
          )
        );
      };
      var h = function (e) {
          var t = e.card,
            a = e.onClose,
            n = e.name;
          return o.a.createElement(
            "section",
            {
              className: "popup popup_"
                .concat(n, " ")
                .concat(t && "popup_opened"),
            },
            o.a.createElement(
              "div",
              { className: "popup__container-place" },
              o.a.createElement("img", {
                src: t && t.link,
                className: "popup__image",
                alt: t && t.name,
              }),
              o.a.createElement(
                "p",
                { className: "popup__place" },
                t && t.name
              ),
              o.a.createElement("button", {
                className: "popup__close",
                onClick: a,
              })
            )
          );
        },
        v = a(7),
        E = a(8),
        b = new ((function () {
          function e(t) {
            var a = t.baseUrl,
              n = t.headers;
            Object(v.a)(this, e), (this.baseUrl = a), (this.headers = n);
          }
          return (
            Object(E.a)(e, [
              {
                key: "_handleOriginalResponse",
                value: function (e) {
                  return e.ok
                    ? e.json()
                    : Promise.reject(
                        new Error(
                          "\u0427\u0442\u043e-\u0442\u043e \u043f\u043e\u0448\u043b\u043e \u043d\u0435 \u0442\u0430\u043a: ".concat(
                            e.status
                          )
                        )
                      );
                },
              },
              {
                key: "getAllInfo",
                value: function () {
                  return Promise.all([
                    this.getInitialCards(),
                    this.getUserInfo(),
                  ]);
                },
              },
              {
                key: "getInitialCards",
                value: function () {
                  return fetch("".concat(this.baseUrl, "/cards"), {
                    headers: this.headers,
                  }).then(this._handleOriginalResponse);
                },
              },
              {
                key: "addCard",
                value: function (e) {
                  return fetch("".concat(this.baseUrl, "/cards"), {
                    method: "POST",
                    headers: this.headers,
                    body: JSON.stringify(e),
                  }).then(this._handleOriginalResponse);
                },
              },
              {
                key: "deleteCard",
                value: function (e) {
                  return fetch("".concat(this.baseUrl, "/cards/").concat(e), {
                    method: "DELETE",
                    headers: this.headers,
                  }).then(this._handleOriginalResponse);
                },
              },
              {
                key: "getUserInfo",
                value: function () {
                  return fetch("".concat(this.baseUrl, "/users/me"), {
                    headers: this.headers,
                  }).then(this._handleOriginalResponse);
                },
              },
              {
                key: "setUserInfo",
                value: function (e) {
                  return fetch("".concat(this.baseUrl, "/users/me"), {
                    method: "PATCH",
                    headers: this.headers,
                    body: JSON.stringify(e),
                  }).then(this._handleOriginalResponse);
                },
              },
              {
                key: "editAvatar",
                value: function (e) {
                  return fetch("".concat(this.baseUrl, "/users/me/avatar"), {
                    method: "PATCH",
                    headers: this.headers,
                    body: JSON.stringify(e),
                  }).then(this._handleOriginalResponse);
                },
              },
              {
                key: "putLike",
                value: function (e) {
                  return fetch(
                    "".concat(this.baseUrl, "/cards/likes/").concat(e),
                    { method: "PUT", headers: this.headers }
                  ).then(this._handleOriginalResponse);
                },
              },
              {
                key: "removeLike",
                value: function (e) {
                  return fetch(
                    "".concat(this.baseUrl, "/cards/likes/").concat(e),
                    { method: "DELETE", headers: this.headers }
                  ).then(this._handleOriginalResponse);
                },
              },
            ]),
            e
          );
        })())({
          baseUrl: "https://mesto.nomoreparties.co/v1/cohort-14",
          headers: {
            authorization: "e63db112-531a-4c6f-ae02-ccc048d1696b",
            "Content-Type": "application/json",
          },
        });
      var k = function (e) {
        var t = e.isOpen,
          a = e.children,
          n = e.onClose,
          r = e.name,
          c = e.title,
          i = e.submit,
          l = e.onSubmit;
        return o.a.createElement(
          "section",
          {
            className: "popup popup_"
              .concat(r, " ")
              .concat(t && "popup_opened", " "),
            onClick: function (e) {
              return e.target !== e.currentTarget && n;
            },
          },
          o.a.createElement(
            "div",
            { className: "popup__container" },
            o.a.createElement("button", {
              className: "popup__close",
              onClick: n,
            }),
            o.a.createElement(
              "form",
              {
                className: "popup__form-container",
                name: r,
                onSubmit: l,
                noValidate: !0,
              },
              o.a.createElement("h2", { className: "popup__title" }, c),
              o.a.createElement(
                "fieldset",
                { className: "popup__form" },
                a,
                o.a.createElement("input", {
                  type: "submit",
                  className: "popup__button",
                  value: i,
                  onClick: n,
                })
              )
            )
          )
        );
      };
      var C = function (e) {
        var t = e.isOpen,
          a = e.onClose,
          n = e.onUpdateUser,
          r = o.a.useState(""),
          c = Object(l.a)(r, 2),
          i = c[0],
          s = c[1],
          u = o.a.useState(""),
          p = Object(l.a)(u, 2),
          m = p[0],
          _ = p[1],
          f = o.a.useContext(d);
        return (
          o.a.useEffect(
            function () {
              s(f.name), _(f.about);
            },
            [f]
          ),
          o.a.createElement(
            k,
            {
              name: "edit-profile",
              title:
                "\u0420\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u043f\u0440\u043e\u0444\u0438\u043b\u044c",
              submit: "\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c",
              isOpen: t,
              onClose: a,
              onSubmit: function (e) {
                e.preventDefault(), n({ name: i, about: m });
              },
            },
            o.a.createElement(
              "div",
              { className: "popup__input-container" },
              o.a.createElement("input", {
                type: "text",
                id: "name",
                name: "name",
                className: "popup__name popup__input",
                placeholder: "\u0418\u043c\u044f",
                value: i || "",
                onChange: function (e) {
                  s(e.target.value);
                },
                required: !0,
                minLength: "2",
                maxLength: "40",
              }),
              o.a.createElement("span", {
                className: "popup__input-error",
                id: "name-error",
              })
            ),
            o.a.createElement(
              "div",
              { className: "popup__input-container" },
              o.a.createElement("input", {
                type: "text",
                id: "job",
                name: "about",
                className: "popup__job popup__input",
                placeholder:
                  "\u041f\u0440\u043e\u0444\u0435\u0441\u0441\u0438\u044f",
                value: m || "",
                onChange: function (e) {
                  _(e.target.value);
                },
                required: !0,
                minLength: "2",
                maxLength: "200",
              }),
              o.a.createElement("span", {
                className: "popup__input-error",
                id: "job-error",
              })
            )
          )
        );
      };
      var N = function (e) {
        var t = e.isOpen,
          a = e.onClose,
          n = e.onUpdateAvatar,
          r = o.a.useRef();
        return o.a.createElement(
          k,
          {
            name: "edit-avatar",
            title:
              "\u041e\u0431\u043d\u043e\u0432\u0438\u0442\u044c \u0430\u0432\u0430\u0442\u0430\u0440",
            submit: "\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c",
            isOpen: t,
            onClose: a,
            onSubmit: function (e) {
              e.preventDefault(), n({ avatar: r.current.value });
            },
          },
          o.a.createElement(
            "div",
            { className: "popup__input-container" },
            o.a.createElement("input", {
              type: "url",
              id: "link",
              name: "avatar",
              className: "popup__job popup__job_theme_place popup__input",
              placeholder:
                "\u0421\u0441\u044b\u043b\u043a\u0430 \u043d\u0430 \u0430\u0432\u0430\u0442\u0430\u0440",
              required: !0,
              ref: r,
            }),
            o.a.createElement("span", {
              className: "popup__input-error",
              id: "link-error",
            })
          )
        );
      };
      var g = function (e) {
        var t = e.onClose,
          a = e.isOpen,
          n = e.onAddPlace,
          r = o.a.useRef(),
          c = o.a.useRef();
        return o.a.createElement(
          k,
          {
            name: "add-place",
            title:
              "\u041d\u043e\u0432\u043e\u0435 \u043c\u0435\u0441\u0442\u043e",
            submit: "\u0421\u043e\u0437\u0434\u0430\u0442\u044c",
            isOpen: a,
            onClose: t,
            onSubmit: function (e) {
              e.preventDefault(),
                n({ name: r.current.value, link: c.current.value });
            },
          },
          o.a.createElement(
            "div",
            { className: "popup__input-container" },
            o.a.createElement("input", {
              type: "text",
              id: "place",
              name: "name",
              className: "popup__name popup__name_theme_place popup__input",
              placeholder: "\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435",
              required: !0,
              minLength: "1",
              maxLength: "30",
              ref: r,
            }),
            o.a.createElement("span", {
              className: "popup__input-error",
              id: "place-error",
            })
          ),
          o.a.createElement(
            "div",
            { className: "popup__input-container" },
            o.a.createElement("input", {
              type: "url",
              id: "link",
              name: "link",
              className: "popup__job popup__job_theme_place popup__input",
              placeholder:
                "\u0421\u0441\u044b\u043b\u043a\u0430 \u043d\u0430 \u043a\u0430\u0440\u0442\u0438\u043d\u043a\u0443",
              required: !0,
              ref: c,
            }),
            o.a.createElement("span", {
              className: "popup__input-error",
              id: "link-error",
            })
          )
        );
      };
      var O = function (e) {
          var t = e.cardId,
            a = e.isOpen,
            n = e.onClose,
            r = e.onSubmit;
          return o.a.createElement(k, {
            name: "delete",
            title:
              "\u0412\u044b \u0443\u0432\u0435\u0440\u0435\u043d\u043d\u044b?",
            submit: "\u0414\u0430",
            isOpen: a,
            onClose: n,
            onSubmit: function (e) {
              e.preventDefault(), r(t);
            },
          });
        },
        y = function () {
          var e = o.a.useState(!1),
            t = Object(l.a)(e, 2),
            a = t[0],
            n = t[1],
            r = o.a.useState(!1),
            c = Object(l.a)(r, 2),
            s = c[0],
            u = c[1],
            _ = o.a.useState(!1),
            v = Object(l.a)(_, 2),
            E = v[0],
            k = v[1],
            y = o.a.useState(!1),
            j = Object(l.a)(y, 2),
            S = j[0],
            U = j[1],
            L = o.a.useState(null),
            A = Object(l.a)(L, 2),
            D = A[0],
            I = A[1],
            P = o.a.useState(null),
            R = Object(l.a)(P, 2),
            x = R[0],
            T = R[1],
            w = o.a.useState({}),
            q = Object(l.a)(w, 2),
            J = q[0],
            z = q[1],
            H = o.a.useState([]),
            M = Object(l.a)(H, 2),
            B = M[0],
            V = M[1];
          o.a.useEffect(function () {
            b.getAllInfo()
              .then(function (e) {
                var t = Object(l.a)(e, 2),
                  a = t[0],
                  n = t[1];
                V(a), z(n);
              })
              .catch(function (e) {
                console.log(e);
              });
          }, []),
            o.a.useEffect(function () {
              var e = function (e) {
                "Escape" === e.key && F();
              };
              return (
                document.addEventListener("keydown", e),
                function () {
                  document.removeEventListener("keydown", e);
                }
              );
            }, []);
          var F = function () {
            n(!1), u(!1), k(!1), I(null), U(!1);
          };
          return o.a.createElement(
            d.Provider,
            { value: J },
            o.a.createElement(
              "div",
              { className: "page" },
              o.a.createElement(
                "div",
                { className: "page__container" },
                o.a.createElement(p, null),
                o.a.createElement(f, {
                  onEditAvatar: function () {
                    k(!0);
                  },
                  onEditProfile: function () {
                    n(!0);
                  },
                  onAddPlace: function () {
                    u(!0);
                  },
                  onCardClick: function (e) {
                    I(e);
                  },
                  onCardDelete: function (e) {
                    U(!0), T(e);
                  },
                  onCardLike: function (e) {
                    var t = e.likes.some(function (e) {
                      return e._id === J._id;
                    });
                    b.putLike(e._id, !t)
                      .then(function (t) {
                        var a = B.map(function (a) {
                          return a._id === e._id ? t : a;
                        });
                        V(a);
                      })
                      .catch(function (e) {
                        console.log(e);
                      });
                  },
                  onCardDislike: function (e) {
                    var t = e.likes.some(function (e) {
                      return e._id === J._id;
                    });
                    b.removeLike(e._id, !t)
                      .then(function (t) {
                        var a = B.map(function (a) {
                          return a._id === e._id ? t : a;
                        });
                        V(a);
                      })
                      .catch(function (e) {
                        console.log(e);
                      });
                  },
                  cards: B,
                }),
                o.a.createElement(m, null),
                o.a.createElement(C, {
                  isOpen: a,
                  onClose: F,
                  onUpdateUser: function (e) {
                    b.setUserInfo(e)
                      .then(function (e) {
                        z(e), F();
                      })
                      .catch(function (e) {
                        console.log(e);
                      });
                  },
                }),
                o.a.createElement(N, {
                  isOpen: E,
                  onClose: F,
                  onUpdateAvatar: function (e) {
                    b.editAvatar(e)
                      .then(function (e) {
                        z(e), F();
                      })
                      .catch(function (e) {
                        console.log(e);
                      });
                  },
                }),
                o.a.createElement(g, {
                  isOpen: s,
                  onClose: F,
                  onAddPlace: function (e) {
                    b.addCard(e)
                      .then(function (e) {
                        V([e].concat(Object(i.a)(B))), F();
                      })
                      .catch(function (e) {
                        console.log(e);
                      });
                  },
                }),
                o.a.createElement(O, {
                  isOpen: S,
                  onClose: F,
                  cardId: x,
                  onSubmit: function (e) {
                    b.deleteCard(e)
                      .then(function () {
                        var t = B.filter(function (t) {
                          return t._id !== e;
                        });
                        V(t);
                      })
                      .catch(function (e) {
                        console.log(e);
                      });
                  },
                }),
                o.a.createElement(h, {
                  name: "photo-zoom",
                  card: D,
                  onClose: F,
                })
              )
            )
          );
        };
      c.a.render(
        o.a.createElement(o.a.StrictMode, null, o.a.createElement(y, null)),
        document.getElementById("root")
      );
    },
    6: function (e, t, a) {
      e.exports = a.p + "static/media/logo-mesto.c6f11019.svg";
    },
  },
  [[10, 1, 2]],
]);
//# sourceMappingURL=main.5559c971.chunk.js.map
