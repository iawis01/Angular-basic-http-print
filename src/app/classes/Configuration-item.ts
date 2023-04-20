import { IConfiguracionItem } from "../interfaces/iconfiguration-item";

export class ConfiguracionItem implements IConfiguracionItem{
    public nombreColumna: string;
    public campo: string;
    public tipo: string;
    public link: string;
    public clase: string;
    public parametro: string;
    constructor(nombreColumna: string, campo: string, tipo: string, link: string, clase: string, parametro: string) {
        this.nombreColumna = nombreColumna;
        this.campo = campo;
        this.tipo = tipo;
        this.link = link;
        this.clase = clase;
        this.parametro = parametro;
    }
}
