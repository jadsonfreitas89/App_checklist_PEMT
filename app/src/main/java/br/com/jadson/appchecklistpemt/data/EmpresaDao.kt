package br.com.jadson.appchecklistpemt.data

import androidx.room.*
import br.com.jadson.appchecklistpemt.data.model.ConfiguracaoEmpresa
import br.com.jadson.appchecklistpemt.data.model.Empresa
import kotlinx.coroutines.flow.Flow

@Dao
interface EmpresaDao {
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertEmpresa(empresa: Empresa)

    @Query("SELECT * FROM empresas WHERE empresaId = :id")
    fun getEmpresaById(id: String): Flow<Empresa?>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertConfiguracao(config: ConfiguracaoEmpresa)

    @Query("SELECT * FROM configuracoes_empresa WHERE empresaId = :empresaId")
    fun getConfiguracaoByEmpresaId(empresaId: String): Flow<ConfiguracaoEmpresa?>
}
