import api from "../lib/axios"

export default {
	obtenerCategorias() {
		return api('/list.php?c=list')
	}
}