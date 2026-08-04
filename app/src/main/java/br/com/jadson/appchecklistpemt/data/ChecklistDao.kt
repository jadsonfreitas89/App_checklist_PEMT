package br.com.jadson.appchecklistpemt.data

import androidx.room.*
import br.com.jadson.appchecklistpemt.data.model.Checklist
import br.com.jadson.appchecklistpemt.data.model.ChecklistItem
import kotlinx.coroutines.flow.Flow

@Dao
interface ChecklistDao {

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertChecklist(checklist: Checklist)

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertItems(items: List<ChecklistItem>)

    @Query("DELETE FROM checklist_items WHERE checklistId = :checklistId")
    suspend fun deleteItemsForChecklist(checklistId: String)

    @Query("SELECT * FROM checklists ORDER BY date DESC")
    fun getAllChecklists(): Flow<List<Checklist>>

    @Query("SELECT * FROM checklist_items WHERE checklistId = :checklistId")
    fun getItemsForChecklist(checklistId: String): Flow<List<ChecklistItem>>

    @Update
    suspend fun updateItem(item: ChecklistItem)

    @Update
    suspend fun updateChecklist(checklist: Checklist)

    @Query("SELECT * FROM checklists WHERE syncStatus != 'SYNCED'")
    suspend fun getPendingSyncChecklists(): List<Checklist>

    @Query("SELECT * FROM checklists WHERE backupStatus = 'PENDENTE' AND pdfPath IS NOT NULL")
    suspend fun getPendingBackupChecklists(): List<Checklist>

    @Delete
    suspend fun deleteChecklist(checklist: Checklist)
}
