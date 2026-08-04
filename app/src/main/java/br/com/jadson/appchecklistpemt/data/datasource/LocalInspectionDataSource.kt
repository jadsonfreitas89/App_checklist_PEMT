package br.com.jadson.appchecklistpemt.data.datasource

import br.com.jadson.appchecklistpemt.data.model.ChecklistItem
import br.com.jadson.appchecklistpemt.core.constants.AppConstants

class LocalInspectionDataSource {

    fun getInitialItems(): List<ChecklistItem> {
        return listOf(
            ChecklistItem(category = AppConstants.Categories.INSPECTION_ITEMS, description = "Boletins de serviço. Verifique se não há boletins de serviço abertos", tiType = "B"),
            ChecklistItem(category = AppConstants.Categories.INSPECTION_ITEMS, description = "Inspeção anual. Certifique-se de concluí-lo em 13 meses.", tiType = "B"),
            ChecklistItem(category = AppConstants.Categories.INSPECTION_ITEMS, description = "Adesivos. No lugar, corretamente anexados e você pode lê-los", tiType = "B"),
            ChecklistItem(category = AppConstants.Categories.INSPECTION_ITEMS, description = "Limit Switches. Instalado corretamente e sem obstruções ou danos.", tiType = "B"),

            ChecklistItem(category = AppConstants.Categories.CHASSIS_MOTOR, description = "Motor e Componentes. Verifique motor e componentes se há itens soltos, ausentes, danificados ou com falha.", tiType = "B"),
            ChecklistItem(category = AppConstants.Categories.CHASSIS_MOTOR, description = "Proteção contra buracos. Ambos os lados não têm obstruções, sujeira ou danos", tiType = "B"),
            ChecklistItem(category = AppConstants.Categories.CHASSIS_MOTOR, description = "Bateria/bandeja hidráulica. As bandejas estão bem travadas e nenhum componente faltando", tiType = "B"),
            ChecklistItem(category = AppConstants.Categories.CHASSIS_MOTOR, description = "Baterias. Sem danos, conexões apertadas e níveis de fluido suficientes. Terminais limpos", tiType = "B"),
            ChecklistItem(category = AppConstants.Categories.CHASSIS_MOTOR, description = "Carregador de bateria. Fixado corretamente e sem danos.", tiType = "B"),
            ChecklistItem(category = AppConstants.Categories.CHASSIS_MOTOR, description = "Montagem da Direção. Fixado corretamente e sem vazamentos, danos ou componentes ausentes", tiType = "B"),
            ChecklistItem(category = AppConstants.Categories.CHASSIS_MOTOR, description = "Conjunto Roda/Pneu. Verifique todos os pneus quanto a danos, peças em falta, desgaste e alinhamento", tiType = "B"),
            ChecklistItem(category = AppConstants.Categories.CHASSIS_MOTOR, description = "Conjunto Roda/Pneu. Porcas da roda com o torque recomendado.", tiType = "C"),
            ChecklistItem(category = AppConstants.Categories.CHASSIS_MOTOR, description = "Eixos. Fixado corretamente e sem componentes ausentes. Conexões apertadas, e mangueiras sem vazamentos", tiType = "B"),
            ChecklistItem(category = AppConstants.Categories.CHASSIS_MOTOR, description = "Eixos. Faça uma verificação e substitua o óleo, se necessário.", tiType = "C"),
            ChecklistItem(category = AppConstants.Categories.CHASSIS_MOTOR, description = "Tanque hidráulico, bomba, motor e linhas. Tampa de enchimento, mangueiras e outros componentes hidráulicos estão bem fechados e sem danos ou vazamentos.", tiType = "B"),
            ChecklistItem(category = AppConstants.Categories.CHASSIS_MOTOR, description = "Óleo hidráulico. Nível na marca superior ou ligeiramente acima dela.", tiType = "B"),
            ChecklistItem(category = AppConstants.Categories.CHASSIS_MOTOR, description = "Óleo hidráulico. Faça uma verificação e substitua o óleo e os filtros, se necessário", tiType = "C"),
            ChecklistItem(category = AppConstants.Categories.CHASSIS_MOTOR, description = "Componentes elétricos. Faça uma verificação em todos os componentes elétricos, como o controlador do motor, se necessário. Fixado corretamente e sem danos. Conexões de fios e fixadores apertados.", tiType = "B"),
            ChecklistItem(category = AppConstants.Categories.CHASSIS_MOTOR, description = "Manifolds. Conexões e mangueiras apertadas e sem danos ou vazamentos. Fios apertados conexões integras, sem componentes ausentes e válvulas funcionando corretamente", tiType = "B"),
            ChecklistItem(category = AppConstants.Categories.CHASSIS_MOTOR, description = "Interruptor de desconexão da alimentação principal. Cabos apertados e em funcionamento, trava para cadeado", tiType = "B"),
            ChecklistItem(category = AppConstants.Categories.CHASSIS_MOTOR, description = "Controles de solo. Opere os interruptores e certifique-se de que todos funcionem corretamente, sem danos ou falta de componentes.", tiType = "B"),
            ChecklistItem(category = AppConstants.Categories.CHASSIS_MOTOR, description = "Freios. Fixado corretamente e sem danos ou vazamentos", tiType = "B"),
            ChecklistItem(category = AppConstants.Categories.CHASSIS_MOTOR, description = "Soldas da Base. Sem deformações ou rachaduras.", tiType = "B"),
            ChecklistItem(category = AppConstants.Categories.CHASSIS_MOTOR, description = "Pontos de aplicação de graxa. Sem obstruções, sujeira ou danos. Adicione graxa se necessário", tiType = "B"),
            ChecklistItem(category = AppConstants.Categories.CHASSIS_MOTOR, description = "Escada. Fixado corretamente e sem danos.", tiType = "B"),
            ChecklistItem(category = AppConstants.Categories.CHASSIS_MOTOR, description = "Sensor de inclinação (Tilt). Fixado corretamente e sem danos.", tiType = "B"),

            ChecklistItem(category = AppConstants.Categories.LIFT_MECHANISM, description = "Suporte(s) de manutenção. Fixado corretamente e sem danos.", tiType = "B"),
            ChecklistItem(category = AppConstants.Categories.LIFT_MECHANISM, description = "Conjunto de tesouras e amortecedores. Fixado corretamente, sem deformações, cabos e fios instalados sem danos", tiType = "B"),
            ChecklistItem(category = AppConstants.Categories.LIFT_MECHANISM, description = "Controles deslizantes e rolos. Fixado corretamente e sem obstruções, sujeira ou danos/desgaste", tiType = "B"),
            ChecklistItem(category = AppConstants.Categories.LIFT_MECHANISM, description = "Cilindro(s) de elevação. Sem danos ou falta de componentes. Conexões apertadas e mangueiras sem vazamentos e instalados corretamente.", tiType = "B"),
            ChecklistItem(category = AppConstants.Categories.LIFT_MECHANISM, description = "Transdutor de Ângulo. Fixado corretamente e sem danos", tiType = "B"),
            ChecklistItem(category = AppConstants.Categories.LIFT_MECHANISM, description = "Pinos de tesoura. Fixado corretamente e sem danos.", tiType = "B"),
            ChecklistItem(category = AppConstants.Categories.LIFT_MECHANISM, description = "Correntes, roletes e cabos de controle. Sem danos ou falta de componentes.", tiType = "B"),

            ChecklistItem(category = AppConstants.Categories.PLATFORM, description = "Grades e Portão. Fixado corretamente e sem danos ou faltando componentes", tiType = "B"),
            ChecklistItem(category = AppConstants.Categories.PLATFORM, description = "Ancoragem de proteção contra quedas. Anéis de fixação conectados corretamente e sem danos", tiType = "B"),
            ChecklistItem(category = AppConstants.Categories.PLATFORM, description = "Tomada extensão. Sem obstruções, sujeira ou danos.", tiType = "B"),
            ChecklistItem(category = AppConstants.Categories.PLATFORM, description = "Console de controle da plataforma. Opere os interruptores e certifique-se de que todos operaram corretamente. Sem danos ou falta de componentes.", tiType = "B"),
            ChecklistItem(category = AppConstants.Categories.PLATFORM, description = "Caixa de armazenamento do manual. Manuais e documentos estão guardados na caixa, em bom estado", tiType = "B"),
            ChecklistItem(category = AppConstants.Categories.PLATFORM, description = "Extintor. Verificar validade, lacre, pressurização", tiType = "B"),
            ChecklistItem(category = AppConstants.Categories.PLATFORM, description = "Plataforma de Extensão. Fixado corretamente e sem danos ou componentes ausentes", tiType = "B"),
            ChecklistItem(category = AppConstants.Categories.PLATFORM, description = "Testes de função. Consulte o manual de operação para o seu número de série para informações sobre como executar esses testes", tiType = "B")
        )
    }
}
