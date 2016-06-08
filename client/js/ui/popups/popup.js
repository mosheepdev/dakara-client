/**
 * Created by horacio on 3/27/16.
 */

define(['jquery-ui'], function () {

    class PopUp {
        constructor(DOMdata, general) { // los pop ups generales se ven en todas las pantallas (no solo juego) y estan centrados en el medio
            if (!DOMdata)
                throw new Error("DOMdata required");

            this.general = general;
            if (general) {
                this.$parent = $("#popUpsGenerales");
            } else {
                this.$parent = $("#popUpsJuego");
            }
            this.$this = $(DOMdata);

            if (this.$parent.children('#' + this.$this.attr('id')).length) {
                throw new Error("pop up inicializado dos veces: " + this.$this.attr('id'));
            }

            this._addCloseButton(this.$this);
            this.$this.hide();
            this.$parent.append(this.$this);
            this.$centering_container = $("#container");
            this.$this.draggable({
                cursor: "move",
                /*containment: "parent"*/
            });
            this.$this.resizable();

            this.visible = false;
        }

        getDomElement(){
            return this.$this;
        }

        show() {
            this.clearDom();
            this.$parent.append(this.$this);
            this.$this.show();

            //centrado:
            this.$this.css("top", (this.$centering_container.height() / 2) - (this.$this.outerHeight() / 2));
            if (this.general) {
                this.$this.css("left", (this.$centering_container.width() / 2) - (this.$this.outerWidth() / 2));
            } else {
                this.$this.css("left", ((this.$centering_container.width() / 2) * 0.8 - (this.$this.outerWidth() / 2)));
            }

            this.visible = true;
        }

        hide() { // OJO, en algunos se cierra con el comando que viene del server (y se puede cerrar 2 veces)
            this.$this.hide();
            this.visible = false;
            //this.$parent.detach(this.$this);
        }

        clearDom() {
            this.$this.find('span').text('');
            this.$this.find('input').val('');
        }

        _addCloseButton($target){
            var $button = $('<button class="botonCerrar"></button>');
            let self = this;
            $button.click(function () {
               self.hide();
            });
            $target.append($button);
        }

    }
    return PopUp;
});