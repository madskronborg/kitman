from kitman.core import configs
from kitman.conf import settings


class TemplatingModelsConfig(configs.SimpleConfig):

    template_variable: configs.ModelConfig
    template_item: configs.ModelConfig
    template: configs.ModelConfig
    template_group: configs.ModelConfig

    # Through relations
    template_through_template_variable: configs.ModelConfig
    template_through_template_item: configs.ModelConfig
    template_group_through_template: configs.ModelConfig
    template_group_through_template_variable: configs.ModelConfig


class TemplatingServicesConfig(configs.SimpleConfig):

    pass


class TemplatingAppConfig(
    configs.AppConfig[TemplatingModelsConfig, TemplatingServicesConfig]
):
    pass