package br.com.jadson.appchecklistpemt.data

import android.content.Context
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase
import androidx.room.TypeConverters
import br.com.jadson.appchecklistpemt.data.model.*

@Database(
    entities = [
        Checklist::class,
        ChecklistItem::class,
        Empresa::class,
        Usuario::class,
        Plataforma::class,
        Inspecao::class,
        ItemInspecao::class,
        FotoInspecao::class,
        ConfiguracaoEmpresa::class
    ],
    version = 9
)
@TypeConverters(Converters::class)
abstract class AppDatabase : RoomDatabase() {

    abstract fun checklistDao(): ChecklistDao
    abstract fun empresaDao(): EmpresaDao
    abstract fun usuarioDao(): UsuarioDao
    abstract fun plataformaDao(): PlataformaDao
    abstract fun inspecaoDao(): InspecaoDao

    companion object {
        @Volatile
        private var INSTANCE: AppDatabase? = null

        fun getDatabase(context: Context): AppDatabase {
            return INSTANCE ?: synchronized(this) {
                val instance = Room.databaseBuilder(
                    context.applicationContext,
                    AppDatabase::class.java,
                    "checklist_database"
                )
                .fallbackToDestructiveMigration()
                .build()
                INSTANCE = instance
                instance
            }
        }
    }
}
