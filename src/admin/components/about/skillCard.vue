<template lang="pug">
  .skill-card(
    :class="{ 'skill-card--edit': editMode }"
  )
    .skill-card__heading-row(
      :class="{'error' : validation.firstError('editedCategory.category')}"
    )
      input(type="text" placeholder="Название новой группы" v-model="editedCategory.category").skill-card__title
      .skill-card__title-error
        error-tooltip(
          :errorText="validation.firstError('editedCategory.category')"
        )
      .skill-card__heading-btns
        .skill-card__edit-mode-btns
          button(
            type='button'
            @click="editCurrSkillCard(editedCategory)"
          ).btn.btn--save-skill-card
          button(
            type='button'
            @click="removeCurrSkillCard(category.id)"
          ).btn.btn--remove-skill-card
        .skill-card__read-mode-btns
          button(
            type='button'
            @click="editMode = true"
          ).btn.btn--edit-skill-card
    .skill-card__table
      skill-table(
        :skills="skills"
      )
    skill-footer(
      :category="category.id"
    )
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import { Validator } from "simple-vue-validator";

export default {
  mixins: [require("simple-vue-validator").mixin],
  validators: {
    "editedCategory.category": value => {
      return Validator.value(value).required("Введите название группы");
    }
  },
  components: {
    skillTable: () => import("components/about/skillTable.vue"),
    skillFooter: () => import("components/about/skillFooter.vue"),
    errorTooltip: () => import("components/common/errorTooltip.vue")
  },

  props: {
    category: Object,
    skills: Array
  },

  data() {
    return {
      editMode: false,
      editedCategory: { ...this.category }
    };
  },

  methods: {
    ...mapActions("skillCategories", ["removeSkillGroup", "editSkillGroup"]),
    ...mapMutations("tooltip", ["SHOW_TOOLTIP"]),

    async removeCurrSkillCard(skillCardId) {
      try {
        await this.removeSkillGroup(skillCardId);
        this["SHOW_TOOLTIP"]({
          type: "success",
          text: "Группа удалена"
        });
      } catch (error) {
        console.log(error.message);
        this["SHOW_TOOLTIP"]({
          type: "error",
          text: "Произошла ошибка"
        });
      }
    },

    async editCurrSkillCard(skillCard) {
      if ((await this.$validate("editedCategory.category")) === false) return;
      try {
        await this.editSkillGroup(skillCard);
        this["SHOW_TOOLTIP"]({
          type: "success",
          text: "Группа обновлена"
        });
        this.editMode = false;
      } catch (error) {
        console.log(error.message);
        this["SHOW_TOOLTIP"]({
          type: "error",
          text: "Произошла ошибка"
        });
      }
    }
  }
};
</script>


<style lang="postcss" scoped>
@import "../../../styles/mixins.pcss";
@import "./styles/skill-card.pcss";
@import "./styles/skill.pcss";

.skill-card__title {
  pointer-events: none;
}
</style>
