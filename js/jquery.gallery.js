(function ($, undefined) {
    $.Gallery = function (options, element) {
        this.$el = $(element);
        this._init(options)
    };
    $.Gallery.defaults = {current: 0, autoplay: false, interval: 2000};
    $.Gallery.prototype = {
        _init: function (options) {
            this.options = $.extend(true, {}, $.Gallery.defaults, options);
            this.support3d = Modernizr.csstransforms3d;
            this.support2d = Modernizr.csstransforms;
            this.supportTrans = Modernizr.csstransitions;
            this.$wrapper = this.$el.find(".dg-wrapper");
            this.$items = this.$wrapper.children();
            this.itemsCount = this.$items.length;
            this.$nav = this.$el.find("nav");
            this.$navPrev = this.$nav.find(".dg-prev");
            this.$navNext = this.$nav.find(".dg-next");
            if (this.itemsCount < 3) {
                this.$nav.remove();
                return false
            }
            this.current = this.options.current;
            this.isAnim = false;
            this.$items.css({"opacity": 0, "visibility": "hidden"});
            this._validate();
            this._layout();
            this._loadEvents();
            if (this.options.autoplay) {
                this._startSlideshow()
            }
        }, _validate: function () {
            if (this.options.current < 0 || this.options.current > this.itemsCount - 1) {
                this.current = 0
            }
        }, _layout: function () {
            this._setItems();
            var leftCSS, rightCSS, currentCSS;
            if (this.support3d && this.supportTrans) {
                if($(window).width()<500){
                    leftCSS = {
                        "-webkit-transform": "translateX(-101px) translateZ(-200px) rotateY(45deg)",
                        "-moz-transform": "translateX(-101px) translateZ(-200px) rotateY(45deg)",
                        "-o-transform": "translateX(-101px) translateZ(-200px) rotateY(45deg)",
                        "-ms-transform": "translateX(-101px) translateZ(-200px) rotateY(45deg)",
                        "transform": "translateX(-101px) translateZ(-200px) rotateY(45deg)"
                    };
                    rightCSS = {
                        "-webkit-transform": "translateX(101px) translateZ(-200px) rotateY(-45deg)",
                        "-moz-transform": "translateX(101px) translateZ(-200px) rotateY(-45deg)",
                        "-o-transform": "translateX(101px) translateZ(-200px) rotateY(-45deg)",
                        "-ms-transform": "translateX(101px) translateZ(-200px) rotateY(-45deg)",
                        "transform": "translateX(101px) translateZ(-200px) rotateY(-45deg)"
                    };
                }else {


                leftCSS = {
                    "-webkit-transform": "translateX(-201px) translateZ(-200px) rotateY(45deg)",
                    "-moz-transform": "translateX(-201px) translateZ(-200px) rotateY(45deg)",
                    "-o-transform": "translateX(-201px) translateZ(-200px) rotateY(45deg)",
                    "-ms-transform": "translateX(-201px) translateZ(-200px) rotateY(45deg)",
                    "transform": "translateX(-201px) translateZ(-200px) rotateY(45deg)"
                };
                rightCSS = {
                    "-webkit-transform": "translateX(201px) translateZ(-200px) rotateY(-45deg)",
                    "-moz-transform": "translateX(201px) translateZ(-200px) rotateY(-45deg)",
                    "-o-transform": "translateX(201px) translateZ(-200px) rotateY(-45deg)",
                    "-ms-transform": "translateX(201px) translateZ(-200px) rotateY(-45deg)",
                    "transform": "translateX(201px) translateZ(-200px) rotateY(-45deg)"
                };
                }
                leftCSS.opacity = 1;
                leftCSS.visibility = "visible";
                rightCSS.opacity = 1;
                rightCSS.visibility = "visible"
            } else {
                if (this.support2d && this.supportTrans) {
                    if($(window).width()<500){
                        leftCSS = {
                            "-webkit-transform": "translateX(-101px) translateZ(-200px) rotateY(45deg)",
                            "-moz-transform": "translateX(-101px) translateZ(-200px) rotateY(45deg)",
                            "-o-transform": "translateX(-101px) translateZ(-200px) rotateY(45deg)",
                            "-ms-transform": "translateX(-101px) translateZ(-200px) rotateY(45deg)",
                            "transform": "translateX(-101px) translateZ(-200px) rotateY(45deg)"
                        };
                        rightCSS = {
                            "-webkit-transform": "translateX(101px) translateZ(-200px) rotateY(-45deg)",
                            "-moz-transform": "translateX(101px) translateZ(-200px) rotateY(-45deg)",
                            "-o-transform": "translateX(101px) translateZ(-200px) rotateY(-45deg)",
                            "-ms-transform": "translateX(101px) translateZ(-200px) rotateY(-45deg)",
                            "transform": "translateX(101px) translateZ(-200px) rotateY(-45deg)"
                        };
                    }else {
                    leftCSS = {
                        "-webkit-transform": "translate(-201px) scale(0.8)",
                        "-moz-transform": "translate(-201px) scale(0.8)",
                        "-o-transform": "translate(-201px) scale(0.8)",
                        "-ms-transform": "translate(-201px) scale(0.8)",
                        "transform": "translate(-201px) scale(0.8)"
                    };
                    rightCSS = {
                        "-webkit-transform": "translate(201px) scale(0.8)",
                        "-moz-transform": "translate(201px) scale(0.8)",
                        "-o-transform": "translate(201px) scale(0.8)",
                        "-ms-transform": "translate(201px) scale(0.8)",
                        "transform": "translate(201px) scale(0.8)"
                    };}
                    currentCSS = {"z-index": 999};
                    leftCSS.opacity = 1;
                    leftCSS.visibility = "visible";
                    rightCSS.opacity = 1;
                    rightCSS.visibility = "visible"
                }
            }
            this.$leftItm.css(leftCSS || {});
            this.$rightItm.css(rightCSS || {});
            this.$currentItm.css(currentCSS || {}).css({"opacity": 1, "visibility": "visible"}).addClass("dg-center")
        }, _setItems: function () {
            this.$items.removeClass("dg-center");
            this.$currentItm = this.$items.eq(this.current);
            this.$leftItm = (this.current === 0) ? this.$items.eq(this.itemsCount - 1) : this.$items.eq(this.current - 1);
            this.$rightItm = (this.current === this.itemsCount - 1) ? this.$items.eq(0) : this.$items.eq(this.current + 1);
            if (!this.support3d && this.support2d && this.supportTrans) {
                this.$items.css("z-index", 1);
                this.$currentItm.css("z-index", 2)
            }
            if (this.itemsCount > 3) {
                this.$nextItm = (this.$rightItm.index() === this.itemsCount - 1) ? this.$items.eq(0) : this.$rightItm.next();
                this.$nextItm.css(this._getCoordinates("outright"));
                this.$prevItm = (this.$leftItm.index() === 0) ? this.$items.eq(this.itemsCount - 1) : this.$leftItm.prev();
                this.$prevItm.css(this._getCoordinates("outleft"))
            }
        }, _loadEvents: function () {
            var _self = this;
            this.$navPrev.on("click.gallery", function (event) {
                if (_self.options.autoplay) {
                    clearTimeout(_self.slideshow);
                    _self.options.autoplay = false
                }
                _self._navigate("prev");
                return false
            });
            this.$navNext.on("click.gallery", function (event) {
                if (_self.options.autoplay) {
                    clearTimeout(_self.slideshow);
                    _self.options.autoplay = false
                }
                _self._navigate("next");
                return false
            });
            this.$wrapper.on("webkitTransitionEnd.gallery transitionend.gallery OTransitionEnd.gallery", function (event) {
                _self.$currentItm.addClass("dg-center");
                _self.$items.removeClass("dg-transition");
                _self.isAnim = false
            })
        }, _getCoordinates: function (position) {
            if (this.support3d && this.supportTrans) {
                switch (position) {
                    case"outleft":

                        return {
                            "-webkit-transform": "translateX(-450px) translateZ(-300px) rotateY(45deg)",
                            "-moz-transform": "translateX(-450px) translateZ(-300px) rotateY(45deg)",
                            "-o-transform": "translateX(-450px) translateZ(-300px) rotateY(45deg)",
                            "-ms-transform": "translateX(-450px) translateZ(-300px) rotateY(45deg)",
                            "transform": "translateX(-450px) translateZ(-300px) rotateY(45deg)",
                            "opacity": 0,
                            "visibility": "hidden"
                        };
                        break;
                    case"outright":
                        return {
                            "-webkit-transform": "translateX(450px) translateZ(-300px) rotateY(-45deg)",
                            "-moz-transform": "translateX(450px) translateZ(-300px) rotateY(-45deg)",
                            "-o-transform": "translateX(450px) translateZ(-300px) rotateY(-45deg)",
                            "-ms-transform": "translateX(450px) translateZ(-300px) rotateY(-45deg)",
                            "transform": "translateX(450px) translateZ(-300px) rotateY(-45deg)",
                            "opacity": 0,
                            "visibility": "hidden"
                        };
                        break;
                    case"left":
                        if($(window).width()<500){
                            return {
                                "-webkit-transform": "translateX(-101px) translateZ(-200px) rotateY(45deg)",
                                "-moz-transform": "translateX(-101px) translateZ(-200px) rotateY(45deg)",
                                "-o-transform": "translateX(-101px) translateZ(-200px) rotateY(45deg)",
                                "-ms-transform": "translateX(-101px) translateZ(-200px) rotateY(45deg)",
                                "transform": "translateX(-101px) translateZ(-200px) rotateY(45deg)",
                                "opacity": 1,
                                "visibility": "visible"
                            };
                        }else {
                            return {
                                "-webkit-transform": "translateX(-201px) translateZ(-200px) rotateY(45deg)",
                                "-moz-transform": "translateX(-201px) translateZ(-200px) rotateY(45deg)",
                                "-o-transform": "translateX(-201px) translateZ(-200px) rotateY(45deg)",
                                "-ms-transform": "translateX(-201px) translateZ(-200px) rotateY(45deg)",
                                "transform": "translateX(-201px) translateZ(-200px) rotateY(45deg)",
                                "opacity": 1,
                                "visibility": "visible"
                            };
                        }
                        break;
                    case"right":
                        if($(window).width()<500){
                            return {
                                "-webkit-transform": "translateX(101px) translateZ(-200px) rotateY(-45deg)",
                                "-moz-transform": "translateX(101px) translateZ(-200px) rotateY(-45deg)",
                                "-o-transform": "translateX(101px) translateZ(-200px) rotateY(-45deg)",
                                "-ms-transform": "translateX(101px) translateZ(-200px) rotateY(-45deg)",
                                "transform": "translateX(101px) translateZ(-200px) rotateY(-45deg)",
                                "opacity": 1,
                                "visibility": "visible"
                            };
                        }else {
                            return {
                                "-webkit-transform": "translateX(201px) translateZ(-200px) rotateY(-45deg)",
                                "-moz-transform": "translateX(201px) translateZ(-200px) rotateY(-45deg)",
                                "-o-transform": "translateX(201px) translateZ(-200px) rotateY(-45deg)",
                                "-ms-transform": "translateX(201px) translateZ(-200px) rotateY(-45deg)",
                                "transform": "translateX(201px) translateZ(-200px) rotateY(-45deg)",
                                "opacity": 1,
                                "visibility": "visible"
                            };
                        }

                        break;
                    case"center":
                        return {
                            "-webkit-transform": "translateX(0px) translateZ(0px) rotateY(0deg)",
                            "-moz-transform": "translateX(0px) translateZ(0px) rotateY(0deg)",
                            "-o-transform": "translateX(0px) translateZ(0px) rotateY(0deg)",
                            "-ms-transform": "translateX(0px) translateZ(0px) rotateY(0deg)",
                            "transform": "translateX(0px) translateZ(0px) rotateY(0deg)",
                            "opacity": 1,
                            "visibility": "visible"
                        };
                        break
                }
            } else {
                if (this.support2d && this.supportTrans) {
                    switch (position) {
                        case"outleft":
                            return {
                                "-webkit-transform": "translate(-450px) scale(0.7)",
                                "-moz-transform": "translate(-450px) scale(0.7)",
                                "-o-transform": "translate(-450px) scale(0.7)",
                                "-ms-transform": "translate(-450px) scale(0.7)",
                                "transform": "translate(-450px) scale(0.7)",
                                "opacity": 0,
                                "visibility": "hidden"
                            };
                            break;
                        case"outright":
                            return {
                                "-webkit-transform": "translate(450px) scale(0.7)",
                                "-moz-transform": "translate(450px) scale(0.7)",
                                "-o-transform": "translate(450px) scale(0.7)",
                                "-ms-transform": "translate(450px) scale(0.7)",
                                "transform": "translate(450px) scale(0.7)",
                                "opacity": 0,
                                "visibility": "hidden"
                            };
                            break;
                        case"left":
                            return {
                                "-webkit-transform": "translate(-350px) scale(0.8)",
                                "-moz-transform": "translate(-350px) scale(0.8)",
                                "-o-transform": "translate(-350px) scale(0.8)",
                                "-ms-transform": "translate(-350px) scale(0.8)",
                                "transform": "translate(-350px) scale(0.8)",
                                "opacity": 1,
                                "visibility": "visible"
                            };
                            break;
                        case"right":
                            return {
                                "-webkit-transform": "translate(350px) scale(0.8)",
                                "-moz-transform": "translate(350px) scale(0.8)",
                                "-o-transform": "translate(350px) scale(0.8)",
                                "-ms-transform": "translate(350px) scale(0.8)",
                                "transform": "translate(350px) scale(0.8)",
                                "opacity": 1,
                                "visibility": "visible"
                            };
                            break;
                        case"center":
                            return {
                                "-webkit-transform": "translate(0px) scale(1)",
                                "-moz-transform": "translate(0px) scale(1)",
                                "-o-transform": "translate(0px) scale(1)",
                                "-ms-transform": "translate(0px) scale(1)",
                                "transform": "translate(0px) scale(1)",
                                "opacity": 1,
                                "visibility": "visible"
                            };
                            break
                    }
                } else {
                    switch (position) {
                        case"outleft":
                        case"outright":
                        case"left":
                        case"right":
                            return {"opacity": 0, "visibility": "hidden"};
                            break;
                        case"center":
                            return {"opacity": 1, "visibility": "visible"};
                            break
                    }
                }
            }
        }, _navigate: function (dir) {
            if (this.supportTrans && this.isAnim) {
                return false
            }
            this.isAnim = true;
            switch (dir) {
                case"next":
                    this.current = this.$rightItm.index();
                    this.$currentItm.addClass("dg-transition").css(this._getCoordinates("left"));
                    this.$rightItm.addClass("dg-transition").css(this._getCoordinates("center"));
                    if (this.$nextItm) {
                        this.$leftItm.addClass("dg-transition").css(this._getCoordinates("outleft"));
                        this.$nextItm.addClass("dg-transition").css(this._getCoordinates("right"))
                    } else {
                        this.$leftItm.addClass("dg-transition").css(this._getCoordinates("right"))
                    }
                    break;
                case"prev":
                    this.current = this.$leftItm.index();
                    this.$currentItm.addClass("dg-transition").css(this._getCoordinates("right"));
                    this.$leftItm.addClass("dg-transition").css(this._getCoordinates("center"));
                    if (this.$prevItm) {
                        this.$rightItm.addClass("dg-transition").css(this._getCoordinates("outright"));
                        this.$prevItm.addClass("dg-transition").css(this._getCoordinates("left"))
                    } else {
                        this.$rightItm.addClass("dg-transition").css(this._getCoordinates("left"))
                    }
                    break
            }
            this._setItems();
            if (!this.supportTrans) {
                this.$currentItm.addClass("dg-center")
            }
        }, _startSlideshow: function () {
            var _self = this;
            this.slideshow = setTimeout(function () {
                _self._navigate("next");
                if (_self.options.autoplay) {
                    _self._startSlideshow()
                }
            }, this.options.interval)
        }, destroy: function () {
            this.$navPrev.off(".gallery");
            this.$navNext.off(".gallery");
            this.$wrapper.off(".gallery")
        }
    };
    var logError = function (message) {
        if (this.console) {
            console.error(message)
        }
    };
    $.fn.gallery = function (options) {
        if (typeof options === "string") {
            var args = Array.prototype.slice.call(arguments, 1);
            this.each(function () {
                var instance = $.data(this, "gallery");
                if (!instance) {
                    logError("cannot call methods on gallery prior to initialization; " + "attempted to call method '" + options + "'");
                    return
                }
                if (!$.isFunction(instance[options]) || options.charAt(0) === "_") {
                    logError("no such method '" + options + "' for gallery instance");
                    return
                }
                instance[options].apply(instance, args)
            })
        } else {
            this.each(function () {
                var instance = $.data(this, "gallery");
                if (!instance) {
                    $.data(this, "gallery", new $.Gallery(options, this))
                }
            })
        }
        return this
    }
})(jQuery);
