package br.com.jadson.appchecklistpemt.data

import androidx.room.TypeConverter
import br.com.jadson.appchecklistpemt.core.constants.SyncStatus

class Converters {
    @TypeConverter
    fun fromSyncStatus(value: SyncStatus): String {
        return value.name
    }

    @TypeConverter
    fun toSyncStatus(value: String): SyncStatus {
        return SyncStatus.valueOf(value)
    }

    @TypeConverter
    fun fromPerfilUsuario(perfil: br.com.jadson.appchecklistpemt.data.model.PerfilUsuario): String {
        return perfil.name
    }

    @TypeConverter
    fun toPerfilUsuario(perfil: String): br.com.jadson.appchecklistpemt.data.model.PerfilUsuario {
        return br.com.jadson.appchecklistpemt.data.model.PerfilUsuario.valueOf(perfil)
    }
}
